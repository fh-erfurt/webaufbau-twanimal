import React, { Component } from "react";
import style from "../assets/css/components/posts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  getDate = () => {
    const date = new Date(this.state.user.createdAt);
    const months = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];

    if (this.state.user.createdAt + 1000 * 60 * 60 * 24 < Date.now()) {
      const month = months[date.getMonth()];
      const day = date.getDate();

      return day + ". " + month;
    } else {
      const hour = date.getHours();
      const minute = date.getMinutes();

      return hour + ":" + minute;
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className={style.post}>
          <div className={style.userInfo}>
            <div className={style.pImage}>
              <img
                src={this.state.user.createdBy.profilePictureUrl}
                alt="pImage"
              />
            </div>
            <div className={style.profileName}>
              <b>{this.state.user.createdBy.displayName}</b>
              <Link to="/">
                @<span>{this.state.user.createdBy.username}</span>
              </Link>
            </div>
            <div className={style.postTime}>
              <b>{this.getDate()}</b>
            </div>
          </div>
          <div className={style.postMessage}>
            <p>{this.state.user.text}</p>
            <div className={style.postImage}>
              <img src={this.state.user.attachements} alt="Schneckimage" />
            </div>
          </div>
          <div className={style.postActions}>
            <FontAwesomeIcon className={style.icons} icon={faHeart} />
            <FontAwesomeIcon className={style.icons} icon={faComment} />
            <FontAwesomeIcon className={style.icons} icon={faRetweet} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
