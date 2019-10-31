import React, { useEffect } from 'react'
import { useStore } from 'store'
import axios from 'axios'
import { SERVER } from 'config'

import { connectSocket, closePopup, logInTwitter, getUserTimelines, getHomeTimelines, getLikeTimelines } from 'actions'
import io from 'socket.io-client'

const socket = io(SERVER)

export default function TwitterAuth() {
  const [{ popup, logInPopup }, dispatch] = useStore()

  useEffect(() => {
    const init = () => {
      const user = JSON.parse(localStorage.getItem('user'))

      const fetchTimeLines = async (type) => {

        const url = `twitter/${type}_timeline`
        const response = await axios({
          method: 'get',
          url,
          params: { user_id: user.id },
          responseType: 'json'
        })
        const data = await response.data
        if (data.success) {
          const dispatchFunc = {
            'user': () => dispatch(getUserTimelines(data.success)),
            'home': () => dispatch(getHomeTimelines(data.success)),
            'like': () => dispatch(getLikeTimelines(data.success))
          }[type]
          dispatchFunc()
        }
        if (data.error) {
          const msg = data.error.split('\n')[0]
          console.log(msg)
        }
      }

      socket.on('connect', async () => {
        let socketId = socket.id
        localStorage.setItem('socketId', socketId)
        dispatch(connectSocket(socketId))

        if (user) {
          dispatch(logInTwitter(user, true))
          fetchTimeLines('user')
          fetchTimeLines('home')
          fetchTimeLines('like')
        }
        else {
        }
      })

      socket.on('user', async (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(logInTwitter(user, true))
        dispatch(closePopup())
        fetchTimeLines('user')
        fetchTimeLines('home')
        fetchTimeLines('like')
      })

      socket.on('disconnect', () => {
        localStorage.removeItem('socketId')
      })
    }
    init()
  }, [])

  useEffect(() => {
    !logInPopup && popup && popup.close()
  }, [popup, logInPopup])

  return (
    <React.Fragment />
  )
}