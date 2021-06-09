import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons"
import style from "../assets/css/components/profileCard.module.scss"

class ProfileCard extends Component {
    constructor(props) {
		super(props);

		this.state = {
			user: this.props.user
		}
	}

    state = {}
    render() {
        return (
            <React.Fragment>
                <div className={style.searchField}>
                    <form action="#">
                        <FontAwesomeIcon
                            className={style.icons}
                            icon={faSearch}
                        />
                        <input
                            type="text"
                            placeholder="Twanimal durchsuchen..."
                            name="search"
                        />
                    </form>
                </div>
                <div className={style.profile}>
                    <div className={style.profileImage}>
                        <img
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                            alt="profileImage"
                        />
                    </div>
                    <div className={style.profileName}>
                        <b>{ this.state.user.displayName }</b>
                        <span>{ this.state.user.username }</span>
                    </div>
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

                <div className={style.newPost}>
                    <FontAwesomeIcon className={style.icons} icon={faPaw} />
                    <button>Neuer Beitrag</button>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileCard
