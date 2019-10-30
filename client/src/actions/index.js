import * as types from './types';

export const connectSocket = socketId => ({
  type: types.CONNECT_SOCKET, payload: {
    socketId
  }
})

export const logInTwitter = (user, auth) => ({
  type: types.LOGIN_TWITTER, payload: {
    user,
    auth
  }
})

export const logOutTwitter = () => ({
  type: types.LOGOUT_TWITTER
})

export const openPopup = popup => ({
  type: types.OPEN_POPUP,
  payload: { popup }
});

export const closePopup = () => ({
  type: types.CLOSE_POPUP
});

export const getUserTimelines = userTimelines => ({
  type: types.GET_USER_TIMELINES,
  payload: { userTimelines }
})

export const getHomeTimelines = homeTimelines => ({
  type: types.GET_HOME_TIMELINES,
  payload: { homeTimelines }
})

export const getLikeTimelines = likeTimelines => ({
  type: types.GET_LIKE_TIMELINES,
  payload: { likeTimelines }
})

export const getFollowers = followers => ({
  type: types.GET_FOLLOWERS,
  payload: { followers }
})

export const getFriends = friends => ({
  type: types.GET_FRIENDS,
  payload: { friends }
})