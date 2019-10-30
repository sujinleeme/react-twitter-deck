import { useEffect, useState } from 'react'

import { useStore } from 'store';
import axios from 'axios';
import { getFollowers, getFriends, getUserTimelines, getHomeTimelines, getLikeTimelines } from 'actions';

export const useFetchData = (params, type) => {
  const [state, dispatch] = useStore();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const url = {
    followers: `twitter/followers`,
    friends: `twitter/friends`,
    'homeTimelines': 'twitter/home_timeline',
    'userTimelines': 'twitter/user_timeline',
    'likeTimelines': 'twitter/like_timeline',
  }[type]

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      const response = await axios({
        method: 'get',
        url,
        params: { user_id: state.user.id, ...params },
        responseType: 'json'
      })
      const data = await response.data;
      if (data.success) {
        const dispatchFunc = {
          'followers': () => dispatch(getFollowers(data.success)),
          'friends': () => dispatch(getFriends(data.success)),
          'userTimelines': () => dispatch(getUserTimelines(data.success)),
          'homeTimelines': () => dispatch(getHomeTimelines(data.success)),
          'likeTimelines': () => dispatch(getLikeTimelines(data.success))
        }[type]
        dispatchFunc()
      }
      if (data.error) {
        const msg = data.error.split('\n')[0]
        setError(msg)
      }
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    state[type].length === 0 && fetchData({ user_id: state.user.id }, `twitter/${type}`, type)
  }, []);

  return { data: state[type], loading, error }
}