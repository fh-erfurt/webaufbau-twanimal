import React, { Component } from 'react';
import style from '../assets/css/components/profileCard.module.scss';

class SearchCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users,
		};
	}

	render() {
		return (
			<React.Fragment>
				{this.state.users.map((user) => {
					return (
						<div className={style.profileCard}>
							<div className={style.profile}>
								<div className={style.profileImage}>
									<img src={user.profilePictureUrl} alt="profileImage" />
								</div>
								<div className={style.profileName}>
									<b>{user.displayName}</b>
									<span>@{user.username}</span>
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
