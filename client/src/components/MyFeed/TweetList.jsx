import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, Divider, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';
import Linkify from 'react-linkify';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  block: {
    display: 'block',
  },
  username: {
    marginLeft: '5px'
  }
}));


const TweetListItem = ({ username, screenname, profileImg, body }) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={profileImg} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Fragment>
            <Typography
              component="span"
              variant="body1"
              className={classes.inline}
              color="textPrimary"
            >
              {username}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              className={classes.username}
            >
              {`@${screenname}`}
            </Typography>
          </Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              className={classes.block}
            >
              <Linkify>{body}</Linkify>
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default function TweetList({ timelines }) {
  return (
    <div>
      {timelines && timelines.map((timeline, index) => {
        const { name, screen_name, profile_image_url } = timeline.user
        return (
          <div key={`user-timeline-${index}`} >
            <TweetListItem
              username={name}
              screenname={screen_name}
              body={timeline.text}
              profileImg={profile_image_url}
            >
            </TweetListItem>
            <Divider />
          </div>
        )
      })}
    </div>
  );
}
