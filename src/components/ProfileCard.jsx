import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/components/profileCard.module.scss";

class ProfileCard extends Component {
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
            <img src={this.state.user.photo} alt="profileImage" />
          </div>
          <div className={style.profileName}>
            <b>{this.state.user.displayName}</b>
            <span>{this.state.user.username}</span>
          </div>
        </div>

        <div className={style.info}>
          <div className={style.posts}>
            <b>{this.state.user.numberOfAllPosts} Beiträge</b>
          </div>
          <div className={style.posts}>
            <b>{this.state.user.numberOfAllFollower} Follower</b>
          </div>
          <div className={style.posts}>
            <b>{this.state.user.namberOfAllFriends} Freunde</b>
          </div>
        </div>

        <div className={style.status}>
          <p>{this.state.user.status}</p>
        </div>

        <div className={style.newPost}>
          <FontAwesomeIcon className={style.icons} icon={faPaw} />
          <button>Neuer Beitrag</button>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileCard;