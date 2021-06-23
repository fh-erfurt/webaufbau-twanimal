import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaw, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "../assets/css/components/navigation.module.scss";

import { authenticationService } from '../services/authenticationService'

class NavigationItem extends Component {
  state = {};
  render() {
    return (
      <Link to={this.props.target} className={styles.item}>
        <FontAwesomeIcon icon={this.props.icon} className={styles.itemIcon} />
        {this.props.text}
      </Link>
    );
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: authenticationService.getUser()
    };
  }

  logout = () => {
    authenticationService.logout()
    this.props.history.push('/')
  }

  state = {};
  render() {
    return (
      <React.Fragment>
        <div className={styles.navigation}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <FontAwesomeIcon icon={faPaw} />
            </div>
            <div className={styles.items}>
              <NavigationItem text="Home" icon={faHome} target="/" />
              <NavigationItem text="Mitteilungen" icon={faBell} target="/" />
            </div>
            <span onClick={ this.logout }>Abmelden</span>
            { this.state.user && 
              <Link to="/profile" className={styles.profile}>
                <div className={styles.profileName}>
                  <b>{this.state.user.username}</b>
                  <span>{this.state.user.displayName}</span>
                </div>
                <div
                  className={styles.profileImage}
                  style={{
                    backgroundImage: `url(${this.state.user.profilePicture})`,
                  }}
                ></div>
              </Link>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
