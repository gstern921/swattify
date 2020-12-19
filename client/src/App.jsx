import "./App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";
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
import Project from './pages/project-page/Project';
import Home from "./pages/home-page/Home";
import MyProjects from './pages/my-projects/MyProjects';


import {checkLoggedInStatus} from "./entities/user/user.actions";

class App extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(checkLoggedInStatus());
  }

  render() {
    const { user } = this.props;
    const { currentUser, errorMessage } = user;
    console.log(currentUser)
    console.log('current user: ', typeof currentUser);
    return (
      <>
        <NavBar user={currentUser}></NavBar>
        {errorMessage && <p>{errorMessage}</p>}
        {currentUser ? (
          <>
            <Route exact path="/"  component={Home}></Route>
            <Route exact path="/project/:projectId"  component={Project}></Route>
            <Route exact path="/my-projects" component={MyProjects}></Route>
            <h1>Logged In As</h1>
            <pre>{JSON.stringify(currentUser, null, 2)}</pre>
          </>
        ) : (
          <>
            <LoginRegisterForm
              loginWithCredentials={this.loginWithCredentials}
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
