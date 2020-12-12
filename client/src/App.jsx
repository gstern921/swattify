import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config/app.config";
import qs from "qs";

import React, { Component, useState } from "react";

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
      url: `${API_URL}/auth/me`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }

  logIn(email, password) {
    return axios({
      method: "POST",
      url: `${API_URL}/auth/register`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: {
        email,
        password,
      },
    });
  }

  register(credentials) {
    return axios({
      method: "POST",
      url: `${API_URL}/auth/register`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: {
        email: credentials.email,
        name: credentials.name,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm,
      },
    });
  }

  logOut() {
    return axios(`${API_URL}/auth/logout`, {
      method: "GET",
      withCredentials: true,
    });
  }

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
        {user ? (
          <>
            <h1>Logged In As</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </>
        ) : (
          <h1>Not Logged In</h1>
        )}
        <h2>Register</h2>
        <form
          action={`${API_URL}/auth/register`}
          method="POST"
          onSubmit={(e) => {
            const email = e.target.querySelector("input[name=email]").value;
            const name = e.target.querySelector("input[name=name]").value;
            const password = e.target.querySelector("input[name=password]")
              .value;
            const passwordConfirm = e.target.querySelector(
              "input[name=passwordConfirm]"
            ).value;
            e.preventDefault();
            this.register({ email, name, password, passwordConfirm })
              .then((response) => {
                this.setState((prevState) => {
                  console.log(prevState);
                  console.log(response);
                  return {
                    user: response.data.user,
                  };
                });
              })
              .catch((err) => {
                console.log("error: ", err.response);
              });
          }}
        >
          <input name="email" placeholder="email" type="email" required />
          <input name="name" placeholder="name" type="text" required />
          <input
            name="password"
            placeholder="password"
            type="password"
            required
          />
          <input
            name="passwordConfirm"
            placeholder="confirm password"
            type="password"
            required
          />
          <button type="submit">Register</button>
        </form>

        <h2>Login</h2>
        <form
          action={`${API_URL}/auth/login`}
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.querySelector("input[name=email]").value;
            const password = e.target.querySelector("input[name=password]")
              .value;
            this.logIn(email, password)
              .then((response) => {
                console.log(response);
                this.setState(() => ({
                  user: response.data.user,
                }));
              })
              .catch((err) => {
                console.log(err.response);
              });
          }}
        >
          <input name="email" placeholder="email" type="email" required />
          <input
            name="password"
            placeholder="password"
            type="password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <form>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.logOut()
                .then((response) => {
                  this.setState(() => ({
                    user: null,
                  }));
                })
                .catch(console.error);
            }}
            type="submit"
          >
            Log Out
          </button>
        </form>
      </>
    );
  }
}

export default App;
