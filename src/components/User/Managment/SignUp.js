import React, { Component } from 'react';
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: '',
      userName: '',
      email: '',
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: { ...this.props.errors } });
    }
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  onSubmit = () => {
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      role: this.state.role,
      userName: this.state.userName,
      email: this.state.email
    };
    this.props.createNewUser(newUser, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Grid container direction="column" className={classes.signUpContainer}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <Container maxWidth="lg">
            <FormControl
              className={classes.signUpFormControl}
              noValidate
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              <TextField
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleChange('firstName')}
                required
                error={isString(errors.firstName)}
                value={this.state.firstName}
                helperText={errors.firstName}
              />
              <br />
              <TextField
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleChange('lastName')}
                required
                error={isString(errors.lastName)}
                value={this.state.lastName}
                helperText={errors.lastName}
              />
              <br />
              <TextField
                type="text"
                name="userName"
                placeholder="UserName"
                onChange={this.handleChange('userName')}
                required
                error={isString(errors.userName)}
                value={this.state.userName}
                helperText={errors.userName}
              />
              <br />
              <TextField
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange('email')}
                required
                error={isString(errors.email)}
                value={this.state.email}
                helperText={errors.email}
              />
              <br />
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange('password')}
                required
                error={isString(errors.password)}
                value={this.state.password}
                helperText={errors.password}
              />
              <br />
              <TextField
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={this.handleChange('confirmPassword')}
                required
                error={isString(errors.confirmPassword)}
                value={this.state.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <br />
              <TextField
                type="text"
                name="role"
                placeholder="Role"
                onChange={this.handleChange('role')}
                required
                error={isString(errors.role)}
                value={this.state.role}
                helperText={errors.role}
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
            </FormControl>
          </Container>
        </Grid>
      </Grid>
    );
  }
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
