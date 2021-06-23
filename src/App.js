import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/fonts/Inter/font.css";
import "./assets/css/App.scss";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Registration from "./routes/Registration";
import Profile from "./routes/Profile";
import Startpage from "./routes/Startpage";
import Page404 from "./routes/Page404";

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
          <Route path="/" exact>
            <Startpage />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
