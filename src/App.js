<<<<<<< HEAD
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/fonts/Inter/font.css";
import "./assets/css/App.scss";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Registration from "./routes/Registration";
import Profile from "./routes/Profile";

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
        </Switch>
      </Router>
    </div>
  );
=======
import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./assets/fonts/Inter/font.css"
import "./assets/css/App.scss"

import Login from "./routes/Login"
import Home from "./routes/Home"
import Registration from "./routes/Registration"
import Profile from "./routes/Profile"

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
                </Switch>
            </Router>
        </div>
    )
>>>>>>> 1750baddc7c7192c3573c20df4faee582d805b05
}

export default App
