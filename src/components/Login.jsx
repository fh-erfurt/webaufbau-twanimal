import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/components/login.module.scss";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="form-text-container">
          <div className="content-wraper-image">
            <div className="img">
              <img src="#" alt="logo" />
            </div>
          </div>
          <div className="text">
            <p>hey!</p>
          </div>
          <div className="form">
            <form action="#">
              <div className="inputs">
                <input type="text" />
                <input type="text" />
              </div>
              <div className="submitButton">
                <button>Login</button>
              </div>
            </form>
          </div>
          <div className="link">
            <a href="#">SignUp</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
