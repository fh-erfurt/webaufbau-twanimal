import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faPaw, faBell } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

import styles from "../assets/css/components/navigation.module.scss"

class NavigationItem extends Component {
    state = {}
    render() {
        return (
            <div className={styles.item}>
                <FontAwesomeIcon
                    icon={this.props.icon}
                    className={styles.itemIcon}
                />
                {this.props.text}
            </div>
        )
    }
}

class Navigation extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className={styles.navigation}>
                    <div className={styles.container}>
                        <div className={styles.logo}>
                            <FontAwesomeIcon icon={faPaw} />
                        </div>
                        <div className={styles.items}>
                            <NavigationItem text="Home" icon={faHome} />
                            <NavigationItem text="Mitteilungen" icon={faBell} />
                        </div>
                        <Link to="/profile" className={styles.profile}>
                            <div className={styles.profileName}>
                                <b>Hannelore</b>
                                <span>@hanni_the_dog</span>
                            </div>
                            <div
                                className={styles.profileImage}
                                style={{
                                    backgroundImage:
                                        "url(https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
                                }}
                            ></div>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navigation
