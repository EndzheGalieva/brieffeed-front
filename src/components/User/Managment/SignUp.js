import React, { Component, useEffect, useState } from 'react';
import { createNewUser } from '../../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TextField,
  Button,
  CssBaseline,
  FormControl,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isString } from 'util';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  container: {
    // display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 150
  },
  input: {
    display: 'none'
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: '',
    userName: '',
    email: ''
  });

  const [errors, setErrors] = useState ({
    errors: {}
  })

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const handleChange = name => event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role,
      userName: values.userName,
      email: values.email
    };
    props.createNewUser(newUser, props.history);
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <FormControl
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange('firstName')}
            required
            error={isString(errors.firstName)}
            value={values.firstName}
            helperText={errors.firstName}
          />
          <br />
          <TextField
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange('lastName')}
            required
            error={isString(errors.lastName)}
            value={values.lastName}
            helperText={errors.lastName}
          />
          <br />
          <TextField
            type="text"
            name="userName"
            placeholder="UserName"
            onChange={handleChange('userName')}
            required
            error={isString(errors.userName)}
            value={values.userName}
            helperText={errors.userName}
          />
          <br />
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange('email')}
            required
            error={isString(errors.email)}
            value={values.email}
            helperText={errors.email}
          />
          <br />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange('password')}
            required
            error={isString(errors.password)}
            value={values.password}
            helperText={errors.password}
          />
          <br />
          <TextField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange('confirmPassword')}
            required
            error={isString(errors.confirmPassword)}
            value={values.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <br />
          <TextField
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleChange('role')}
            required
            error={isString(errors.role)}
            value={values.role}
            helperText={errors.role}
          />
          <br />
          <br />
          <Button
            color="primary"
            variant="outlined"
            className={classes.margin}
            onClick={onSubmit}
            // component={Link}
            // to="/login"
          >
            Sign Up
          </Button>
        </FormControl>
      </Container>
    </div>
  );
}

SignUp.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToprops = state => ({
  errors: state.errors
});

export default connect(mapStateToprops, { createNewUser })(SignUp);
