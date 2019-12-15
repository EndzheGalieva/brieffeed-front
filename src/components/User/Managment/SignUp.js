import React, { useEffect, useState } from 'react';
import { createNewUser } from '../../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TextField,
  Button,
  FormControl,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { isString } from 'util';
import styles from '../../../styles';

function SignUp(props) {
  const {classes} = props;
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: '',
    userName: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    errors: {}
  });

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
    <Grid
      container
      direction="column"
      className={classes.signUpContainer}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom classname={classes.signUpHeader}>
          Sign Up
        </Typography>
        <Container maxWidth="lg">
          <FormControl
            className={classes.signUpContainer}
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
              className={classes.button}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </FormControl>
        </Container>
      </Grid>
    </Grid>
  );
}

SignUp.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToprops = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToprops, { createNewUser })(styles(SignUp));
