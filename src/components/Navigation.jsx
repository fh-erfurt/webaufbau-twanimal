import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaw, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "../assets/css/components/navigation.module.scss";

class NavigationItem extends Component {
  state = {};
  render() {
    return (
      <div className={styles.item}>
        <FontAwesomeIcon icon={this.props.icon} className={styles.itemIcon} />
        {this.props.text}
      </div>
    );
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
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
              <NavigationItem text="Home" icon={faHome} />
              <NavigationItem text="Mitteilungen" icon={faBell} />
            </div>
            <Link to="/profile" className={styles.profile}>
              <div className={styles.profileName}>
                <b>{this.state.user.username}</b>
                <span>{this.state.user.displayName}</span>
              </div>
              <div
                className={styles.profileImage}
                style={{
                  backgroundImage: `url(${this.state.user.photo})`,
                }}
              ></div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
