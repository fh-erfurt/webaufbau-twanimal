import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/routes/form.module.scss";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import { authenticationService } from "../services/authenticationService";

import config from "../config";

export default function Registration({ history }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState(null);

  const registration = async (event) => {
    event.preventDefault();

    const response = await fetch(`${config.apiHost}/user/registration`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        displayName: displayName,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const apiToken = data.apiToken;
      delete data.apiToken;

      authenticationService.storeSession({
        user: data,
        apiToken: apiToken,
      });

      history.push("/");
    } else {
      let message = "Unbekannter Fehler";
      const errorObject = await response.json();

      switch (errorObject.error) {
        case "invalid email":
          message = "Ungültige E-Mail Adresse";
          break;
        case "invalid username":
          message = "Ungültige username";
          break;
        case "invalid displayName":
          message = "Ungültige displayName";
          break;
        case "invalid password":
          message = "Ungültige password";
          break;
      }
      setError(message);
    }
  };

  return (
    <React.Fragment>
      <div className={style.verticalCenter}>
        <div className={style.registrationTextContainer}>
          <div className={style.contentWraperImage}>
            <div className={style.logo}>
              <FontAwesomeIcon className={style.icons} icon={faPaw} />
            </div>
          </div>
          <div className={style.text}>
            <p>Erstelle einen neuen Account bei Twanimal</p>
          </div>
          <div className={style.form}>
            <form onSubmit={registration}>
              {error && <div className={style.errorMessage}>{error}</div>}
              <div className={style.inputs}>
                <input type="text" placeholder="Name des Haustieres" />
                <input type="text" placeholder="Nutzername" />
                <input type="email" placeholder="Email" />
                <div className={style.passwordInput}>
                  <input
                    id="passwordConfirmLeft"
                    type="password"
                    placeholder="Passwort"
                  />
                  <input
                    id="passwordConfirmRight"
                    type="password"
                    placeholder="Passwort wiederholen"
                  />
                </div>
              </div>
              <div className={style.submitButton}>
                <button>Registrieren</button>
              </div>
            </form>
          </div>
          <div className={style.link}>
            <Link to="/login">
              Doch schon Teil der Crew? Hier geht's zur Anmeldung!
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
