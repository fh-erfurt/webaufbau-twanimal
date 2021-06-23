import React, { Component } from "react";

import style from "../assets/css/components/singlePost.module.scss";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      otherUser: this.props.otherUser,
    };
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className={style.content}>
          <div className={style.box}>
            <div className={style.profile}>
              <div className={style.profileImage}>
                <img src={this.state.user.photo} alt="profileImage" />
              </div>
              <div className={style.profileName}>
                <b>{this.state.user.displayName}</b>
                <span>{this.state.user.username}</span>
              </div>
            </div>
            <div className={style.post}>
              <p>{this.state.user.status}</p>
            </div>
            <div className={style.date}>
              <p>1:00 pm . 16 juni 2021 . twanimal Web App</p>
            </div>
            <div className={style.statistics}>
              <p>103 Like</p>
              <p>6 Share</p>
              <p>3 Comment</p>
            </div>
            <div className={style.funktion}>
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
            <div className={style.comment}>
              <div className={style.profileImage}>
                <img src={this.state.otherUser.photo} alt="profileImage" />
              </div>
              <div className={style.text}>
                <input type="text" placeholder="Twittere deine Antwort" />
              </div>
              <div className={style.answer}>
                <button>Antworten</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SinglePost;
