import React, { Component } from "react";
import style from "../assets/css/components/post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post,
    };
  }

  getDate = () => {
    const date = new Date(this.state.post.createdAt);
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

    if (this.state.post.createdAt + 1000 * 60 * 60 * 24 < Date.now()) {
      const month = months[date.getMonth()];
      const day = date.getDate();

      return day + ". " + month;
    } else {
      let hour = date.getHours();
      let minute = date.getMinutes();

      if(hour < 10) hour = '0' + hour;
      if(minute < 10) minute = '0' + minute;

      return hour + ":" + minute + " Uhr";
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className={style.post}>
          <div className={style.userInfo}>
            <div className={style.profileImage}>
              <img
                src={this.state.post.createdBy.profilePictureUrl}
                alt="profileImage"
              />
            </div>
            <div className={style.profileName}>
              <b>{this.state.post.createdBy.displayName}</b>
              <Link to="/">
                @<span>{this.state.post.createdBy.username}</span>
              </Link>
            </div>
            <div className={style.postTime}>
              <b>{this.getDate()}</b>
            </div>
          </div>
          <div className={style.postMessage}>
            <p>{this.state.post.text}</p>
            { this.state.post.attachements.length > 0 && <div className={style.postImages}>
              { this.state.post.attachements.map((attachement, index) => {
                return (
                  <div className={style.postImage} key={ index }>
                    <img src={attachement} />
                  </div>
                )
              }) }</div>}
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

export default Post;
