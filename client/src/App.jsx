import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import HomePage from "./pages/home-page/HomePage";

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
import {checkLoggedInStatus} from "./entities/user/user.actions";

class App extends Component {
  constructor(props) {
    super(props);
  }

  // loginWithCredentials = ({ email, password }) => (e) => {
  //   e.preventDefault();
  //   return axios({
  //     method: "POST",
  //     url: API_LOGIN_ENDPOINT,
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //     data: {
  //       email,
  //       password,
  //     },
  //   })
  //     .then((response) => {
  //       // console.log(response);
  //       this.setState(() => ({
  //         currentUser: response.data.user,
  //       }));
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

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
        document.location = "/";
      })
      .catch((err) => {
        console.log("error: ", err.response);
      });
  };

  // logOut = (e) => {
  //   e.preventDefault();
  //   return axios(API_LOGOUT_ENDPOINT, {
  //     method: "GET",
  //     withCredentials: true,
  //   })
  //     .then(() => {
  //       console.log(this);
  //       this.setState(() => ({
  //         currentUser: null,
  //       }));
  //       document.location = '/';
  //     })
  //     .catch(console.error);
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(checkLoggedInStatus());
    //   .then((response) => {
    //     console.log(response);
    //     this.setState(() => ({
    //       currentUser: response.data.user,
    //     }));
    //   })
    //   .catch();
  }

  render() {
    const { user } = this.props;
    const { currentUser } = user;
    console.log(currentUser)
    console.log('current user: ', typeof currentUser);
    return (
      <>
        <NavBar user={currentUser}></NavBar>
        {currentUser ? (
          <>
            <Route exact path="/" render={() => <HomePage></HomePage>}></Route>
            <h1>Logged In As</h1>
            <pre>{JSON.stringify(currentUser, null, 2)}</pre>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps)(App);
