import React, { Component } from "react"
import Navigation from "../components/Navigation"
import style from "../assets/css/routes/profile.module.scss" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons"
import Suggestions from "../components/Suggestions"

class Profile extends Component {
    render() {
        return <React.Fragment>
            <Navigation history={this.props.history} />
           
            <div className={style.background}>
            <Suggestions/>
                
            </div>
            <div className={style.content}>
                <div className={style.profile}>
                    <div className={style.profileImage}>
                        <img
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                            alt="profileImage"
                        />
                    </div>
                    
                </div>
                
                <div className={style.profileName}>
                        <b>Hannelore</b>
                        <span>@hanni_the_dog</span>
                </div>

                <div className={style.info}>
                    <div className={style.posts}>
                        <b>12 Beiträge</b>
                    </div>
                    <div className={style.posts}>
                        <b>400 Follower</b>
                    </div>
                    <div className={style.posts}>
                        <b>40 Freunde</b>
                    </div>
                </div>

                <div className={style.status}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        ut aliquam, purus sit amet luctus venenatis, lectus
                        magna fringilla urna, porttitor rhoncus dolor purus non
                        enim praesent elementum facilisis leo, vel
                    </p>

                </div>

                <div className={style.editProfil}>  
                        <button>Profil bearbeiten</button>
                </div>
            </div>

               
                
        </React.Fragment>
    }
}

export default Profile