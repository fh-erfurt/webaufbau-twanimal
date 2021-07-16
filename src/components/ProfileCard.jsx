import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../assets/css/components/profileCard.module.scss';
import { authenticationService } from '../services/authenticationService';

class ProfileCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: props.user || authenticationService.getUser(),
		};
	}

	render() {
		return (
			<React.Fragment>
				<div className={style.profileCard}>
					<div className={style.profile}>
						<div className={style.profileImage}>
							<Link to={`/profile/${this.state.user.username}`}>
								<img src={this.state.user.profilePictureUrl} alt="profileImage" />
							</Link>
						</div>
						<div className={style.profileName}>
							<b>{this.state.user.displayName}</b>
							<span>@{this.state.user.username}</span>
						</div>
					</div>

					<div className={style.info}>
						<div className={style.stat}>
							<b>{this.state.user.postCount} Beiträge</b>
						</div>
						<div className={style.stat}>
							<b>{this.state.user.followerCount} Follower</b>
						</div>
						<div className={style.stat}>
							<b>{this.state.user.followingCount} Freunde</b>
						</div>
					</div>

					<div className={style.status}>
						<p>{this.state.user.description}</p>
					</div>

					<div className={style.footer}>
						Copyright &copy; 2021 Twanimal UG (haftungsbeschränkt) &nbsp;-&nbsp;
						<Link to="/impressum">Impressum</Link>
						&nbsp;-&nbsp;
						<Link to="/datenschutz">Datenschutz</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ProfileCard;
