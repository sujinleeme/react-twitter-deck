import React from 'react';
import { Link } from "react-router-dom";
import { Menu, MenuItem, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'
import { mdiDotsVertical, mdiArrowLeft } from '@mdi/js';

import { logOutTwitter } from 'actions';
import { useStore } from 'store';
import { Redirect } from 'react-router-dom'


const options = ['Logout'];
const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
  primary: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 0
  },
  secondary: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }
}));

export default function Header({ goBack, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, dispatch] = useStore();

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null)
    if (option === 'Logout') {
      dispatch(logOutTwitter())
      localStorage.removeItem('user');
      localStorage.removeItem('socketId');
      return <Redirect to='' />
    }
  };
  const classes = useStyles();
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <Toolbar className={goBack ? classes.primary : classes.secondary}>
      {!goBack &&
        <Link to="/">
          <IconButton>
            <Icon path={mdiArrowLeft} size={0.9} />
          </IconButton>
        </Link>
      }
      {title && capitalize(title)}
      <IconButton
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon path={mdiDotsVertical} size={0.9} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
}
