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
                        <PostContent 
                        friends={{
                            picture:
                            "https://cdn.discordapp.com/attachments/715508471293935669/851834287971631134/greg-rosenke-GGGOnJKb3KM-unsplash_1.jpg",
                            sPicture:
                            "https://cdn.discordapp.com/attachments/715508471293935669/851834468070588436/zdenek-machacek-_9bRrDyOQTQ-unsplash.jpg",
                            dName: "Schneckbert", 
                            uName: "Schneki_Schneck",
                            text: "Hallo Leute! Hier ist Schneckbert, ich war heute mal wieder ganz fix unterwegs. Außerdem hatte ich heute mein neues Outfit an. Wie findet ihr das? #schnecksi",
                            time: "2Uhr",
                            
                        }}
                        />
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
