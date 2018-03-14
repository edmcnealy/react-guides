import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { alertSuccess, alertWarn, alertError } from '../actions/alertActions';
import SubmitButton from './submitButton';
import User from '../models/user';
import { login } from '../services/authService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }

  login() {
    const { dispatch } = this.props;
    
    if (this.state.username === '') {
      dispatch(alertWarn('You need to provide a username.'));
      return;
    }
    if (this.state.password === '') {
      dispatch(alertWarn('You need to provide a password.'));
      return;
    }

    login(this.state.username, this.state.password);
    dispatch(alertSuccess('Logged in!'));
  }

  updateUsername(evt) {
    this.setState({
      username: evt.target.value
    });
  }
  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <h4>Login</h4>

        <form>
          <div className="row">
            <div className="input-field col s12 l6">
              <input id="username" type="text" className="validate" value={this.state.username} onChange={evt => this.updateUsername(evt)} />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 l6">
              <input id="password" type="password" className="validate" value={this.state.password} onChange={evt => this.updatePassword(evt)} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 l6">
              <SubmitButton className="green darken-2" style={{width: '100%'}} submit={this.login} loading={this.props.isLoggingIn} name="Submit"></SubmitButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggingIn: false
  };
}

export default withRouter(connect(mapStateToProps)(Login))