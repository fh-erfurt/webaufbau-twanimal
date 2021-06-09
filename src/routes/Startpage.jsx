import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import style from "../assets/css/routes/startpage.module.scss"
import { Link } from "react-router-dom"

class Startpage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={style.formTextContainer}>
                    <div className={style.contentWraperImage}>
                        <div className={style.logo}>
                            <FontAwesomeIcon
                                className={style.icons}
                                icon={faPaw}
                            />
                        </div>
                    </div>
                    <div className={style.heading}>
                        <h1>Gib deinem Haustier eine Stimme!</h1>
                    </div>
                    <div className={style.text}>
                        <p>Willkommen bei Twanimal</p>
                    </div>
                    <div className={style.loginButton}>
                        <Link to="/login">
                            <button>
                                <FontAwesomeIcon 
                                    className={style.buttonIcon} 
                                    icon={faPaw} 
                                />
                                Anmelden
                            </button>
                        </Link>
                    </div>
                    <div className={style.registrationButton}>
                        <a href="#">
                            <button>
                                <FontAwesomeIcon 
                                    className={style.buttonIcon} 
                                    icon={faPaw} 
                                />
                                Registrieren
                            </button>
                        </a>
                    </div>
                    <div className={style.link}>
                        <a href="#">
                            Was ist Twanimal?
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Startpage