require('dotenv').config({ path: `.env` });

const callbackURL = process.env.CALLBACK_URL
  ? process.env.CALLBACK_URL
  : 'http://localhost:5000/twitter/callback';

exports.PORT = process.env.PORT || 5000;

exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN
  : 'http://localhost:5000';

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL,
};

exports.NODE_ENV = process.env.NODE_ENV;
