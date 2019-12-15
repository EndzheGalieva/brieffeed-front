import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  Snackbar,
  Grid,
  Typography,
  Container,
  FormControl
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../../actions/securityActions';
import { isString } from 'util';
import styles from '../../../styles';

function Login(props) {
  const { classes } = props;
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    isAuthenticated: false,
    open: false
  });

  const [errors, setErrors] = useState({
    errors: {}
  });

  const handleChange = name => event => {
    const data = event.target.value;
    setErrors({ ...errors, [name]: !data });
    setValues({ ...values, [name]: data });
  };

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
    if (props.security.validToken) {
      props.history.push('/posts');
    }
  }, [props.security.validToken, props.errors, props.history]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setValues({ open: false });
  };

  const onSubmit = () => {
    const req = {
      username: values.username,
      password: values.password
    };
    props.login(req);
  };

  return (
    <Grid container direction="column" className={classes.loginContainer}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom classname={classes.loginHeader}>
          Login
        </Typography>
        <Container maxWidth="lg">
          <FormControl
            className={classes.loginContainer}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange('username')}
              error={isString(errors.username)}
              value={values.username}
              helperText={errors.username}
            />
            <br />
            <TextField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange('password')}
              error={isString(errors.password)}
              value={values.password}
              helperText={errors.password}
            />
            <br />
            <br />
            <Button
              color="primary"
              variant="outlined"
              className={classes.margin}
              onClick={onSubmit}
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
            ></Snackbar>
          </FormControl>
        </Container>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateProps, { login })(styles(Login));
