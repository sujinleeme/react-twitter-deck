export const logInTwitter = (state, { payload }) => ({
  ...state,
  user: payload.user,
  auth: payload.auth
});

export const logOutTwitter = (state) => ({
  ...state,
  user: null,
  auth: null
});

export const connectSocket = (state, { payload }) => ({
  ...state,
  socketId: payload.socketId
})

export const openPopup = (state, { payload }) => ({
  ...state,
  popup: payload.popup,
  logInPopup: true
})

export const closePopup = state => ({
  ...state,
  logInPopup: false
})

export const getUserTimelines = (state, { payload }) => ({
  ...state,
  userTimelines: [...payload.userTimelines, ...state.userTimelines]
})

export const getHomeTimelines = (state, { payload }) => ({
  ...state,
  homeTimelines: [...payload.homeTimelines, ...state.homeTimelines]
})

export const getLikeTimelines = (state, { payload }) => ({
  ...state,
  likeTimelines: [...payload.likeTimelines, ...state.likeTimelines]
})

export const getFollowers = (state, { payload }) => ({
  ...state,
  followers: [...payload.followers.users, ...state.followers]
})

export const getFriends = (state, { payload }) => ({
  ...state,
  friends: [...payload.friends.users, ...state.friends]
})
