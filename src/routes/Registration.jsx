import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/routes/form.module.scss";
import { Link } from "react-router-dom";

class Registration extends Component {
    render() {
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
                <form action="#">
                    <div className={style.inputs}>
                        <input type="text" placeholder="Name des Haustieres" />
                        <input type="text" placeholder="Nutzername" />
                        <input type="email" placeholder="Email" />
                        <div className={style.passwordInput}>
                            <input id="passwordConfirmLeft" type="password" placeholder="Passwort" />
                            <input id="passwordConfirmRight" type="password" placeholder="Passwort wiederholen" />
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
            </div>
            </React.Fragment>
        )
    }
}

export default Registration
