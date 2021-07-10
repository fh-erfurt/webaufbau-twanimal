import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import style from "../assets/css/components/newComment.module.scss";

class NewComment extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <form className={style.newComment}>
          <div className={style.newCommentRow}>
            <img
              className={style.profileImage}
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
              alt="profileImage"
            />
            <div className={style.commentContent}>
              <textarea
                placeholder="Post kommentieren..."
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className={style.commentActionRow}>
            <div className={style.spacer}></div>
            <button className={style.sendComment}>
              {this.state.isSubmitting && (
                <span>
                  <FontAwesomeIcon spin={true} icon={faCircleNotch} />
                  &nbsp;
                </span>
              )}
              senden
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default NewComment;
