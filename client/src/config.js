export const SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://react-twitter-deck.herokuapp.com'
    : 'http://localhost:5000';

export const TWITTER_CONFIG = {
  consumerKey: process.env.REACT_APP_TWITTER_KEY,
  consumerSecret: process.env.REACT_APP_TWITTER_SECRET,
};
