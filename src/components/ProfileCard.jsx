import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/components/profileCard.module.scss";
import { authenticationService } from "../services/authenticationService";

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: authenticationService.getUser(),
    };
  }

  state = {};
  render() {
    return (
      <React.Fragment>
        <div className={style.profileCard}>
          <div className={style.searchField}>
            <form action="#">
              <FontAwesomeIcon className={style.icons} icon={faSearch} />
              <input
                type="text"
                placeholder="Twanimal durchsuchen..."
                name="search"
              />
            </form>
          </div>
          <div className={style.profile}>
            <div className={style.profileImage}>
              <Link to={`/profile/${this.state.user.username}`}>
                <img
                  src={this.state.user.profilePictureUrl}
                  alt="profileImage"
                />
              </Link>
            </div>
            <div className={style.profileName}>
              <b>{this.state.user.displayName}</b>
              <span>@{this.state.user.username}</span>
            </div>
          </div>

          <div className={style.info}>
            <div className={style.posts}>
              <b>{this.state.user.postCount} Beiträge</b>
            </div>
            <div className={style.posts}>
              <b>{this.state.user.followerCount} Follower</b>
            </div>
            <div className={style.posts}>
              <b>{this.state.user.followingCount} Freunde</b>
            </div>
          </div>

          <div className={style.status}>
            <p>{this.state.user.description}</p>
          </div>

          <div className={style.footer}>
            <p>
              Copyright &copy; 2021 Twanimal UG (haftungsbeschränkt)
              &nbsp;-&nbsp;
              <Link to="/impressum">Impressum</Link>
              &nbsp;-&nbsp;
              <Link to="/datenschutz">Datenschutz</Link>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileCard;
