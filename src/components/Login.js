import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Posts from './Posts';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function SnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'success']).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function Login() {
  const classes = useStyles2();
  const anchorRef = React.useRef(null);
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    isAuthenticated: false,
    open: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const handleClose = event => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setValues({ open: false });
  };

  const login = () => {
    const user = {
      username: values.username,
      password: values.password
    };
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(res => {
        const jwtToken = res.headers.get('Authorization');
        if (jwtToken !== null) {
          sessionStorage.setItem('jwt', jwtToken);
          setValues({ isAuthenticated: true });
        } else {
          setValues({ open: true });
        }
      })
      .catch(err => console.error(err));
  };

  const logout = () => {
    sessionStorage.removeItem('jwt');
    setValues({ isAuthenticated: false });
  };

  if (values.isAuthenticated === true) {
    console.log('User is logined!');
    return (
      <React.Fragment>
        <Posts />
        <Snackbar
          style={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={values.open}
          onClose={handleClose}
          autoHideDuration={2500}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            variant="error"
            className={classes.margin}
            message="Check your username and password!"
          />
        </Snackbar>
      </React.Fragment>
    );
  } else {
    console.log('User is not logined!');
    return (
      <div>
        <TextField
          name="username"
          placeholder="Username"
          onChange={handleChange('username')}
        />
        <br />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange('password')}
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="outlined"
          className={classes.margin}
          onClick={login}
        >
          Login
        </Button>
        <Snackbar
          style={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={values.open}
          onClose={handleClose}
          autoHideDuration={2500}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            variant="error"
            className={classes.margin}
            message="Check your username and password!"
          />
        </Snackbar>
      </div>
    );
  }
}

export default Login;
