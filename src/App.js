import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/fonts/Inter/font.css";
import "./assets/css/App.scss";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Registration from "./routes/Registration";
import Profile from "./routes/Profile";
import Page404 from "./routes/Page404";
import Imprint from "./routes/Imprint";
import Privacy from "./routes/Privacy";
import AboutUs from "./routes/AboutUs";
import PostPage from "./routes/PostPage";

import { SecuredRoute } from "./components/SecuredRoute";
import { StartpageRoute } from "./components/StartpageRoute";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <SecuredRoute path="/profile/:id" exact component={ Profile } />
          <Route path="/login" component={ Login } />
          <Route path="/registration" component={ Registration } />
          <Route path="/impressum" component={ Imprint } />
          <Route path="/datenschutz" component={ Privacy } />
          <Route path="/ueber-uns" component={ AboutUs } />
          <Route path="/post/:id" component={PostPage} />
          <StartpageRoute path="/" component={ Home } exact />
          <Page404 />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
