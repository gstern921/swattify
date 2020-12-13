import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import axios from "axios";

import {
  API_LOGIN_ENDPOINT,
  API_LOGOUT_ENDPOINT,
  API_ME_ENDPOINT,
  API_REGISTER_ENDPOINT,
} from "./config/app.config";

import NavBar from "./components/navbar/NavBar";

import React, { Component } from "react";
import LoginRegisterForm from "./containers/login-register-form/LoginRegisterForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  checkLogInStatus() {
    return axios({
      method: "GET",
      url: API_ME_ENDPOINT,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }

  loginWithCredentials = ({ email, password }) => (e) => {
    e.preventDefault();
    return axios({
      method: "POST",
      url: API_LOGIN_ENDPOINT,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        // console.log(response);
        this.setState(() => ({
          user: response.data.user,
        }));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  registerWithCredentials = (credentials) => (e) => {
    e.preventDefault();
    return axios({
      method: "POST",
      url: API_REGISTER_ENDPOINT,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: {
        email: credentials.email,
        name: credentials.name,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm,
      },
    })
      .then((response) => {
        this.setState((prevState) => {
          // console.log(prevState);
          // console.log(response);
          return {
            user: response.data.user,
          };
        });
      })
      .catch((err) => {
        console.log("error: ", err.response);
      });
  };

  logOut = (e) => {
    e.preventDefault();
    return axios(API_LOGOUT_ENDPOINT, {
      method: "GET",
      withCredentials: true,
    })
      .then(() => {
        console.log(this);
        this.setState(() => ({
          user: null,
        }));
      })
      .catch(console.error);
  };

  componentDidMount() {
    this.checkLogInStatus()
      .then((response) => {
        console.log(response);
        this.setState(() => ({
          user: response.data.user,
        }));
      })
      .catch();
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={user} logOutHandler={this.logOut}></NavBar>
        {user ? (
          <>
            <h1>Logged In As</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </>
        ) : (
          <>
            <LoginRegisterForm
              loginWithCredentials={this.loginWithCredentials}
              registerWithCredentials={this.registerWithCredentials}
            ></LoginRegisterForm>
          </>
        )}
      </>
    );
  }
}

export default App;