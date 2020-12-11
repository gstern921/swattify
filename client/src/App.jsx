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

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <a href={`${API_URL}/auth/github`}>Login</a>
        <a href="https://github.com/login/oauth/authorize?scope=user&client_id=ead8dfda194179aefc4b&redirect_uri=http://localhost:3000/">
          Login 2
        </a>

        <Router>
          <Switch>
            <Route
              render={(props) => {
                const code = qs.parse(props.location.search, {
                  ignoreQueryPrefix: true,
                }).code;
                if (code) {
                  return (
                    <button
                      onClick={() => {
                        axios
                          .post(
                            `https://github.com/login/oauth/access_token?code=${code}&client_id=ead8dfda194179aefc4b&redirect_uri=http://localhost:3000/&client_secret=f17488f73c7fbc7e30e658aeb5f628d25f60982e`
                          )
                          .then(console.log);
                      }}
                    >
                      Get Data
                    </button>
                  );
                }
                // if (props.location.search(/[\?&]code=(.+?)&?$/)) {
                //   return <div>Code sent to second</div>;
                // }
              }}
            ></Route>
          </Switch>
        </Router>
        <div></div>
      </>
    );
  }
}

export default App;
