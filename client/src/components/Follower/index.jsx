import React from 'react'
import MenuBar from '../Header'
import FollowerItem from './Follower'
import { List, Divider } from '@material-ui/core'
import { useFetchData } from 'utils/generalMethods'

export default function Followers({ title, type }) {

  const { data, loading, error } = useFetchData({}, type)

  return (
    <React.Fragment>
      <MenuBar title={title} />
      <List>
        {loading && <h1>Loading.......</h1>}
        {error && <h1>Loading.......</h1>}
        {data && data.map((follower, index) => {
          const { name, screen_name, profile_image_url_https, description } = follower
          return (
            <div key={`user-followers-${index}`} >
              <FollowerItem
                name={name}
                username={screen_name}
                profilePic={profile_image_url_https}
                description={description}
              />
              <Divider component="li" />
            </div>
          )
        })}
      </List>
    </React.Fragment >)
}