import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/fonts/Inter/font.css";
import "./assets/css/App.scss";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Registration from "./routes/Registration";
import Profile from "./routes/Profile";
import Startpage from "./routes/Startpage";
import Post from "./routes/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/">
            <Startpage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
