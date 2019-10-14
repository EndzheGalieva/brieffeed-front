import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CreatePostButton from '../Post/CreatePostButton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Brieffeed
          </Typography>
          <Button component={Link} to="/posts" color="inherit">Posts</Button>
          <Button component={Link} to="/users" color="inherit">Users</Button>
          <CreatePostButton />          
          <Button component={Link} to="/login" color="inherit">Log in</Button>
          <Button component={Link} to="/signup" color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
