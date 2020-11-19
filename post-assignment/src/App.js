import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/home.component";
import GetPosts from "./components/Getposts.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Home" className="navbar-brand">
            USERS
          </a>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/get_posts/:id" component={GetPosts} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
