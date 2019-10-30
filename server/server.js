const express = require('express');
const http = require('http');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');

const { Strategy: TwitterStrategy } = require('passport-twitter');
const { TWITTER_CONFIG, CLIENT_ORIGIN, NODE_ENV } = require('./config');

const Twit = require('twit');
let T = null;
// ref: https://github.com/funador/react-auth-server/blob/twitter-auth/server.js
// Private api keys that you will get when registering an app on
// apps.twitter.com

// Create the server and allow express and sockets to run on the same port
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// parse cookies
app.use(cookieParser());

// Allows the application to accept JSON and use passport
app.use(express.json());
app.use(passport.initialize());

// Set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

// saveUninitialized: true allows us to attach the socket id
// to the session before we have authenticated with Twitter
app.use(
  session({
    secret: 'KeyboardKittens',
    rolling: true,
    resave: false,
    saveUninitialized: true,
  }),
);

// allows us to save the user into the session
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Basic setup with passport and Twitter
passport.use(
  new TwitterStrategy(TWITTER_CONFIG, (token, tokenSecret, profile, cb) => {
    // save the user right here to a database if you want
    const user = {
      ...profile._json,
      name: profile.username,
      photo: profile.photos[0].value.replace(/_normal/, ''),
      token,
      tokenSecret,
    };

    T = new Twit({
      consumer_key: TWITTER_CONFIG.consumerKey,
      consumer_secret: TWITTER_CONFIG.consumerSecret,
      access_token: user.token,
      access_token_secret: user.tokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    cb(null, user);
  }),
);

// Middleware that triggers the PassportJs authentication process
const twitterAuth = passport.authenticate('twitter');

// This custom middleware picks off the socket id (that was put on req.query)
// and stores it in the session so we can send back the right info to the
// right socket
const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// This is endpoint triggered by the popup on the client which starts the whole
// authentication process
app.get('/twitter', addSocketIdToSession, twitterAuth);

// This is the endpoint that Twitter sends the user information to.
// The twitterAuth middleware attaches the user to req.user and then
// the user info is sent to the client via the socket id that is in the
// session.
app.get('/twitter/callback', twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit('user', req.user);
  res.end();
});

app.get('/twitter/user_timeline', (req, res) => {
  if (!T) {
    res.send({ error: 'ERROR: No Twitter Authentication' });
  } else {
    T.get('statuses/user_timeline', {})
      .catch(err => res.send({ error: `ERROR: ${err.stack}` }))
      .then(result => res.send({ success: result.data }));
  }
});


app.get('/twitter/home_timeline', (req, res) => {
  if (!T) {
    res.send({ error: 'ERROR: No Twitter Authentication' });
  } else {
    T.get('statuses/home_timeline', {})
      .catch(err => res.send({ error: `ERROR: ${err.stack}` }))
      .then(result => res.send({ success: result.data }));
  }
});


app.get('/twitter/like_timeline', (req, res) => {
  if (!T) {
    res.send({ error: 'ERROR: No Twitter Authentication' });
  } else {
    T.get('favorites/list', {})
      .catch(err => res.send({ error: `ERROR: ${err.stack}` }))
      .then(result => res.send({ success: result.data }));
  }
});


app.get('/twitter/followers', (req, res) => {
  if (!T) {
    console.log('ERROR: No Twitter Authentication')
    res.send({ error: 'ERROR: No Twitter Authentication' });
  } else {
    T.get('followers/list', { user_id: req.query.user_id })
      .catch(err => res.send({ error: `ERROR: ${err.stack}` }))
      .then(result => res.send({ success: result.data }));
  }
});


app.get('/twitter/friends', (req, res) => {
  if (!T) {
    console.log('ERROR: No Twitter Authentication')
    res.send({ error: 'ERROR: No Twitter Authentication' });
  } else {
    T.get('friends/list', { screen_name: req.query.id })
      .catch(err => res.send({ error: `ERROR: ${err.stack}` }))
      .then(result => res.send({ success: result.data }));
  }
});



//production mode
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join((__dirname = '/../client/build/index.html')));
  });
}

server.listen(process.env.PORT || 5000, () => {
  console.log('listening...');
});
