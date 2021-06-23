import React, { Component } from "react";
import Navigation from "../components/Navigation";
import SinglePost from "../components/SinglePost";

class Post extends Component {
  state = {};
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
        <body>
          <SinglePost
            user={{
              photo:
                "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
              username: "Hanni",
              displayName: "the dog",
              status:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel",
            }}
            otherUser={{
              photo:
                "https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            }}
          />
        </body>
      </React.Fragment>
    );
  }
}

export default Post;
