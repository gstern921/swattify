import React, { useState } from "react";
import { connect } from 'react-redux';
import { login } from '../../entities/user/user.actions';
import { API_URL } from "../../config/app.config";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handlePasswordChange = (e) => {
    this.setState(() => ({
      password: e.target.value
    }))
  }

  handleEmailChange = (e) => {
    this.setState(() => ({
      email: e.target.value
    }))
  }

  render() {
    const { dispatch } = this.props;
    const {email, password} = this.state;
  return (
    <div className="login-form__container">
      <h2>Log In</h2>
      <h4>email: {email}</h4>
      <h4>password: {password}</h4>
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login({ email, password }));
        }}
      >
        <input
          name="email"
          placeholder="email"
          type="email"
          required
          onChange={this.handleEmailChange}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          onChange={this.handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

}

export default connect(null, null)(LoginForm);
