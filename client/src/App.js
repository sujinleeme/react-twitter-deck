import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';

import MyFeedPage from './components/MyFeed';
import FollowersPage from './components/Follower';
import LoginPage from './components/LogIn';

import { useStore } from 'store';
import { StoreProvider } from "store";
import reducers from "reducers"

import TwitterAuth from 'utils/TwitterAuth'
import initialState from "store/initialState"
import Loading from 'components/Loading'

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '15px',
    height: '90vh',
    marginTop: '5vh',
    overflowY: 'scroll',
    display: 'flex',
    width: '350px',
    justifyContent: 'center'
  },
  content: {
    flexGrow: 1,
    width: '100%'
  },
}));

function AppRouter() {
  const classes = useStyles();
  const [{ user, socketId }] = useStore();

  const prevUser = JSON.parse(localStorage.getItem('user'))

  return (
    <Router>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Card className={classes.card}>
          <div className={classes.content}>
            <Route exact path="/" component={() => prevUser === user ? < LoginPage /> : <MyFeedPage />} />
            <Route exact path="/login" component={() => (user ? <Redirect to="" /> : <LoginPage />)} />
            <Route exact path="/followers" component={() => (
              user ? <FollowersPage type="followers" title="followers" /> : <Redirect to="" />)} />
            <Route exact path="/friends" component={() => (
              user ? <FollowersPage type="friends" title="friends" /> : <Redirect to="" />)} />
          </div>
        </Card>
      </Grid>
    </Router>
  );
};


export default function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducers}>
      <AppRouter />
      <TwitterAuth />
    </StoreProvider>
  );
}
