import React, { Component } from 'react';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      open: false,
      errors: {}
    };
  }

  handleChange = name => event => {
    const data = event.target.value;
    this.setState({ ...this.state, [name]: data });
  };

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: { ...this.props.errors } });
    }
    if (this.props.security.validToken) {
      this.props.history.push('/posts');
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  onSubmit = () => {
    const req = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(req);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
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
              onSubmit={this.onSubmit}
            >
              <TextField
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange('username')}
                error={isString(errors.username)}
                value={this.state.username}
                helperText={errors.username}
              />
              <br />
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange('password')}
                error={isString(errors.password)}
                value={this.state.password}
                helperText={errors.password}
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                className={classes.margin}
                onClick={this.onSubmit}
              >
                Login
              </Button>
              <Snackbar
                style={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={2500}
              ></Snackbar>
            </FormControl>
          </Container>
        </Grid>
      </Grid>
    );
  }
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

export default connect(
  mapStateProps,
  { login }
)(styles(Login));
