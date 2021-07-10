import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "../assets/css/components/post.module.scss";

class Comment extends Component {
  getDate = () => {
    const date = new Date();
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

    if (date + 1000 * 60 * 60 * 24 < Date.now()) {
      const month = months[date.getMonth()];
      const day = date.getDate();

      return day + ". " + month;
    } else {
      let hour = date.getHours();
      let minute = date.getMinutes();

      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;

      return hour + ":" + minute + " Uhr";
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={style.comment}>
          <div className={style.userInfo}>
            <div className={style.profileImage}>
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="pImage"
              />
            </div>
            <div className={style.profileName}>
              <b>Hannelore</b>
              <Link to="/">
                @<span>the_dog</span>
              </Link>
            </div>
            <div className={style.postTime}>
              <b>{this.getDate()}</b>
            </div>
            <div className={style.commentMessage}>
              <p>
                <b>
                  Kommentar zum Post von{" "}
                  <Link to="/">
                    @<span>the_dog</span>
                  </Link>
                  :{" "}
                </b>
              </p>
              <p>
                Klasse Post liebe Hannelore! Herzliche Grüße, deine Hannelore.
              </p>
              {/* { this.state.post.attachements.length > 0 && <div className={style.postImages}>
              { this.state.post.attachements.map((attachement, index) => {
                return (
                  <div className={style.postImage} key={ index }>
                    <img src={attachement} />
                  </div>
                )
              }) }</div>} */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
