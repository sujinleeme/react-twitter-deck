import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

import Icon from '@mdi/react'
import { mdiTwitter } from '@mdi/js';

import { useStore } from 'store';

import { openPopup } from 'actions';

import { SERVER } from '../../config';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));


function Popup(socketId) {
  const width = 600,
    height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const url = `${SERVER}/twitter?socketId=${socketId}`;
  return window.open(
    url,
    '',
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
  );
}

export default function Login() {
  const classes = useStyles();
  const [{ socketId }, dispatch] = useStore();

  return (
    <div className={classes.loginContainer}>
      <Typography variant="h6" gutterBottom>
        Getting Started
      </Typography>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.margin}
        startIcon={<Icon path={mdiTwitter} color="white" size={1} />}
        onClick={() => dispatch(openPopup(Popup(socketId)))}
      >
        Login with Twitter
      </Button>
    </div>
  );
}
