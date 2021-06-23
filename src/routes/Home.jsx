import React, { Component } from "react";
import Navigation from "../components/Navigation";
import ProfileCard from "../components/ProfileCard";
import PostContent from "../components/PostContent";

import style from "../assets/css/routes/home.module.scss";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <Navigation
            history={this.props.history}
            user={{
              username: "Hannelore",
              displayName: "@hanni_the_dog",
              photo:
                "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            }}
          />
        </header>
        <div className={style.content}>
          <div className={style.postContent}>
            <PostContent />
          </div>
          <div className={style.profileCard}>
            <ProfileCard
              user={{
                photo:
                  "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                username: "Hanni",
                displayName: "the dog",
                numberOfAllPosts: 12,
                numberOfAllFollower: 400,
                namberOfAllFriends: 40,
                status:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel",
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
