import React from "react";
import { connect } from 'react-redux';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState(() => ({
      email: e.target.value
    }))
  }

  handleNameChange = (e) => {
    this.setState(() => ({
      name: e.target.value
    }));
  }

  handlePasswordChange = (e) => {
    this.setState(() => ({
      password: e.target.value
    }))
  }

  handlePasswordConfirmChange = (e) => {
    this.setState(() => ({
      passwordConfirm: e.target.value
    }))
  }

  handleImageUrlChange = (e) => {
    this.setState(() => ({
      imageUrl: e.target.value
    }))
  }

  render() {
    const {email, name, password, passwordConfirm} = this.state;

  return (
    <div className="register-form__container">
      <h2>Register</h2>
      <h4>email: {email}</h4>
      <h4>password: {password}</h4>
      <h4>passwordConfirm: {passwordConfirm}</h4>
      <h4>name: {name}</h4>
      <form
        className="register-form"
      >
        <input
          name="email"
          placeholder="email"
          type="email"
          required
          onChange={this.handleEmailChange}
        />
        <input
          name="name"
          placeholder="name"
          type="text"
          required
          onChange={this.handleNameChange}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          onChange={this.handlePasswordChange}
        />
        <input
          name="passwordConfirm"
          placeholder="confirm password"
          type="password"
          onChange={this.handlePasswordConfirmChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

}

export default connect()(RegisterForm);