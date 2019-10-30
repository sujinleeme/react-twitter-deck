import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Tabs, Tab, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import { useStore } from 'store';

import MenuBar from '../Header'
import TweetList from './TweetList'

import Icon from '@mdi/react'
import { mdiMapMarkerOutline } from '@mdi/js';
import Linkify from 'react-linkify';



const FOLLOWER_STATS_TABS = [{
  title: 'Followers',
  link: 'followers',
  key: 'followers_count'
}, {
  title: 'Friends', link: 'friends',
  key: 'friends_count'
}]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  list: {
    display: 'flex',
    margin: '0 auto',
    color: 'inherit !important'
  },
  listItem: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  twitterLogo: {
    background: '#1da1f2',
    width: '80px',
    height: '100px',
    borderRadius: '20px 0 40px 0',
    position: 'absolute'
  },
  tab: {
    width: `${100 / 3}%`,
    minWidth: 'auto'
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function MyFeedPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [{ user, userTimelines, homeTimelines, likeTimelines }] = useStore();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TABS = [
    {
      title: 'home',
      component: () => <TweetList timelines={homeTimelines} />
    }, {
      title: 'tweets',
      component: () => <TweetList timelines={userTimelines} />
    }, {
      title: 'likes',
      component: () => <TweetList timelines={likeTimelines} />
    }
  ]

  return (
    <React.Fragment>
      <Grid container>
        <MenuBar goBack="false" />
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >

          <Avatar className={classes.bigAvatar} src={user && user.photo} />
          <Typography variant="h6">{user && user.screen_name}</Typography>


          <Grid container
            justify="center"
            alignItems="center">
            <Icon path={mdiMapMarkerOutline} size={0.9} />
            <Typography align='center' variant="body2">{user && user.location}</Typography>
          </Grid>
          <Typography align='center' variant="body2"><Linkify>{user && user.description}</Linkify></Typography>
        </Grid>
        <List className={classes.list}>
          {FOLLOWER_STATS_TABS.map((tab, index) =>
            <Link to={tab.link} key={`followers-tab-${index}`}>
              <ListItem>
                <ListItemText className={classes.listItem} primary={user && user[tab.key]} secondary={tab.title} />
              </ListItem>
            </Link>
          )}
        </List>
      </Grid>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        {TABS.map((tab, index) => <Tab className={classes.tab} label={tab.title} key={`tab-${index}`}></Tab>)}
      </Tabs>
      {TABS.map((tab, index) => <TabPanel value={value} index={index} key={`tab-panel-${index}`}>{tab.component}</TabPanel>)}
    </React.Fragment>
  );
}
