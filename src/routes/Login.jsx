import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/routes/form.module.scss";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={style.verticalCenter}>
          <div className={style.formTextContainer}>
            <div className={style.contentWraperImage}>
              <div className={style.logo}>
                <FontAwesomeIcon className={style.icons} icon={faPaw} />
              </div>
            </div>
            <div className={style.text}>
              <p>Melde dich bei Twanimal an</p>
            </div>
            <div className={style.form}>
              <form action="#">
                <div className={style.inputs}>
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                </div>
                <div className={style.submitButton}>
                  <button>Login</button>
                </div>
              </form>
            </div>
            <div className={style.link}>
              <Link to="/registration">
                Noch nicht Teil der Crew? Hier geht's zur Registration
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
