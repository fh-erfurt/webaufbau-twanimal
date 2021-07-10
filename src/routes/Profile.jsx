import React, { Component } from "react";
import Navigation from "../components/Navigation";
import style from "../assets/css/routes/profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons";
import Suggestions from "../components/Suggestions";
import config from "../config";
import { authenticationService } from "../services/authenticationService";
import Post from "../components/Post";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      posts: null,
    };

    this.apiToken = authenticationService.getAPIToken();
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return;
    this.getUser();
  }

  getUser = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`${config.apiHost}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      this.setState({ user: user });
      await this.getPosts();
    }
  };

  getPosts = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`${config.apiHost}/user/${id}/posts`, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({ posts: data.results });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navigation history={this.props.history} />
        {this.state.user ? (
          <div className={style.content}>
            <div className={style.leftContent}>
              <div className={style.background}>
                <Suggestions />
              </div>

              <div className={style.profile}>
                <div className={style.editProfil}>
                  <button>Profil bearbeiten</button>
                </div>
                <div className={style.profileImage}>
                  <img
                    src={this.state.user.profilePictureUrl}
                    alt="profileImage"
                  />
                </div>

                <div className={style.profileName}>
                  <b>{this.state.user.displayName}</b>
                  <span>@{this.state.user.username}</span>
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
              </div>
              {this.state.posts != null &&
                this.state.posts.map((post, index) => {
                  return <Post post={post} key={index} />;
                })}
            </div>
          </div>
        ) : (
          <div>wird geladen</div>
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
