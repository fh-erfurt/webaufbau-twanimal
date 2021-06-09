import React, { Component } from "react"
import style from "../assets/css/components/postContent.module.scss"

class PostContent extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className={style.postContent}>
                    <div className={style.profileImage}>
                        <img
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                            alt="profileImage"
                        />
                    </div>

                    <div className={style.status}>
                        <p>Was gibt es neues?</p>
                    </div>

                    <div className={style.newPost}>
                        <button>Wuff</button>
                    </div>
                </div>
                <div className={style.post}>
                    <div className={style.pImage}>
                        <img
                            src="https://cdn.discordapp.com/attachments/715508471293935669/851834287971631134/greg-rosenke-GGGOnJKb3KM-unsplash_1.jpg"
                            alt="pImage"
                        />
                    </div>

                    <div className={style.profileName}>
                        <b>Schneckbert</b>
                        <span>@Schneki_schneck</span>
                    </div>
                    <div className={style.info}>
                            <b>2 Uhr</b> 
                    </div>
                    <div className={style.Neu}>
                        <p>
                        Hallo Leute!
                        Hier ist Schneckbert, ich war heute mal wieder ganz fix unterwegs. Außerdem hatte ich heute mein neues Outfit an. 
                        Wie findet ihr das? #schnecksi
                        </p>
                        <div className={style.Image}>
                            <img
                                src="https://cdn.discordapp.com/attachments/715508471293935669/851834468070588436/zdenek-machacek-_9bRrDyOQTQ-unsplash.jpg"
                                alt="Schneckimage"
                            />
                        </div>
                    </div>
                   
                </div>
            </React.Fragment>
        )
    }
}

export default PostContent
