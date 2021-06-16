import React, { Component } from "react"
import style from "../assets/css/components/postContent.module.scss"

class PostContent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          friends: this.props.friends,
        };
      }
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className={style.postContent}>
                    <div className={style.profileImage}>

                        <img src={this.state.user.photo} alt="profileImage" />

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

                        <img src={this.state.friends.picture} alt="pImage" />
        
                    </div>

                    <div className={style.profileName}>
                        <b>{this.state.friends.dName}</b>
                        <span>{this.state.friends.uName}</span>
                    </div>
                    <div className={style.info}>
                            <b>{this.state.friends.time}</b> 
                    </div>
                    <div className={style.Neu}>
                        <p>{this.state.friends.text}</p>
                        <div className={style.Image}>

                        <img src={this.state.friends.sPicture} alt="Schneckimage" />


                        </div>
                    </div>
                   
                </div>
            </React.Fragment>
        )
    }
}

export default PostContent
