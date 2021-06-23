import React, { Component } from "react"
import style from "../assets/css/components/postContent.module.scss"

class PostContent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: this.props.user,
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

                        <img src={this.state.user.picture} alt="pImage" />
        
                    </div>

                    <div className={style.profileName}>
                        <b>{this.state.user.dName}</b>
                        <span>{this.state.user.uName}</span>
                    </div>
                    <div className={style.info}>
                        <b>{this.state.user.time}</b> 
                    </div>
                    <div className={style.Neu}>
                        <p>{this.state.user.text}</p>
                        <div className={style.Image}>

                        <img src={this.state.user.sPicture} alt="Schneckimage" />


                        </div>
                    </div>
                   
                </div>
            </React.Fragment>
        )
    }
}

export default PostContent
