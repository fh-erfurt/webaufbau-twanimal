import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/routes/form.module.scss";
import { Link } from "react-router-dom";

import { authenticationService } from '../services/authenticationService'

class Login extends Component {

  constructor(props) {
    super(props)
    this.fakeLogin = this.fakeLogin.bind(this)

    this.state = {
      loggingIn: false
    }
  }

  fakeLogin = (event) => {
    event.preventDefault()

    const history = this.props.history;
    this.setState({
      loggingIn: true
    })

    window.setTimeout(() => {
      authenticationService.storeSession({
        user: {
          id: -1,
          username: 'Doggo',
          displayName: 'Doggo the cat',
          profilePicture: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        },
        apiToken: 'asdfasdfasfasdf'
      })

      history.push('/')
    }, 1000);
  }

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
              <form onSubmit={this.fakeLogin}>
                <div className={style.inputs}>
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                </div>
                <div className={style.submitButton}>
                  <button>
                    { this.state.loggingIn && <span><FontAwesomeIcon spin={true} icon={faCircleNotch} />&nbsp;</span> }
                    Login
                    </button>
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
