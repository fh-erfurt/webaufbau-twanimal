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
            <PostContent 
            user={{
                photo:  "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
                picture:"https://images.unsplash.com/photo-1598588414774-4bb069dbc05d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                uName: "@Schneki_Schneck",
                dName: "Schneckbert",
                text: "Hallo Leute! Hier ist Schneckbert, ich war heute mal wieder ganz fix unterwegs. Außerdem hatte ich heute mein neues Outfit an. Wie findet ihr das? #schnecksi",
                time: "2 Uhr",

                sPicture:"https://images.unsplash.com/photo-1567161291513-d8d58620c5ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1029&q=80",
            }}
                />
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