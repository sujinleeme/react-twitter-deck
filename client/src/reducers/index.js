import * as twitter from './twitter';
import * as types from 'actions/types';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default createReducer({
  [types.GET_USER_TIMELINES]: twitter.getUserTimelines,
  [types.GET_HOME_TIMELINES]: twitter.getHomeTimelines,
  [types.GET_LIKE_TIMELINES]: twitter.getLikeTimelines,
  [types.GET_FOLLOWERS]: twitter.getFollowers,
  [types.GET_FRIENDS]: twitter.getFriends,
  [types.LOGIN_TWITTER]: twitter.logInTwitter,
  [types.LOGOUT_TWITTER]: twitter.logOutTwitter,
  [types.CONNECT_SOCKET]: twitter.connectSocket,
  [types.OPEN_POPUP]: twitter.openPopup,
  [types.CLOSE_POPUP]: twitter.closePopup,
});
