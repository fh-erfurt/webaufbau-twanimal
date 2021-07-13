import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/components/profileCard.module.scss';
import { authenticationService } from '../services/authenticationService';

class SearchCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users,
		};
	}

	state = {};
	render() {
		return (
			<React.Fragment>
				{this.state.users.map((user) => {
					return (
						<div className={style.profileCard}>
							<div className={style.profile}>
								<div className={style.profileImage}>
									<img
										src={user.profilePictureUrl /* todo: search result */}
										alt="profileImage"
									/>
								</div>
								<div className={style.profileName /* todo: search result */}>
									<b>{user.displayName /* todo: search result */}</b>
									<span>@{user.username /* todo: search result */}</span>
								</div>
							</div>
						</div>
					);
				})}
			</React.Fragment>
		);
	}
}

export default SearchCard;
