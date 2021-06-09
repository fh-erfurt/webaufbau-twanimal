import React, { Component } from "react"
import Navigation from "../components/Navigation"
import ProfileCard from "../components/ProfileCard"
import PostContent from "../components/PostContent"

import style from "../assets/css/routes/home.module.scss"

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="App-header">
                    <Navigation />
                </header>
                <div className={style.content}>
                    <div className={style.postContent}>
                        <PostContent />
                    </div>
                    <div className={style.profileCard}>
                        <ProfileCard user={{ username: 'Hanni', displayName: 'the dog' }} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home
