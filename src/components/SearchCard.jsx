import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/components/profileCard.module.scss';
import { authenticationService } from '../services/authenticationService';

class SearchCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: authenticationService.getUser(),
		};
	}

	state = {};
	render() {
		return (
			<React.Fragment>
				<div className={style.profileCard}>
					<div className={style.searchField}>
						<form action="#" method="GET">
							<FontAwesomeIcon className={style.icons} icon={faSearch} />
							<input type="text" placeholder="Twanimal durchsuchen..." name="search" />
						</form>
					</div>
					<div className={style.profile}>
						<div className={style.profileImage}>
							<img src={this.state.user.profilePictureUrl /* todo: search result */} alt="profileImage" />
						</div>
						<div className={style.profileName /* todo: search result */}>
							<b>{this.state.user.displayName /* todo: search result */}</b>
							<span>@{this.state.user.username /* todo: search result */}</span>
						</div>
					</div>

					<div className={style.status}>{<p>{this.state.user.description}</p> /* todo: search result */}</div>

					<div className={style.profile}>
						<div className={style.profileImage}>
							<img src={this.state.user.profilePictureUrl /* todo: search result */} alt="profileImage" />
						</div>
						<div className={style.profileName /* todo: search result */}>
							<b>{this.state.user.displayName /* todo: search result */}</b>
							<span>@{this.state.user.username /* todo: search result */}</span>
						</div>
					</div>

					<div className={style.status}>{<p>{this.state.user.description}</p> /* todo: search result */}</div>

					<div className={style.profile}>
						<div className={style.profileImage}>
							<img src={this.state.user.profilePictureUrl /* todo: search result */} alt="profileImage" />
						</div>
						<div className={style.profileName /* todo: search result */}>
							<b>{this.state.user.displayName /* todo: search result */}</b>
							<span>@{this.state.user.username /* todo: search result */}</span>
						</div>
					</div>

					<div className={style.status}>{<p>{this.state.user.description}</p> /* todo: search result */}</div>

					<div className={style.profile}>
						<div className={style.profileImage}>
							<img src={this.state.user.profilePictureUrl /* todo: search result */} alt="profileImage" />
						</div>
						<div className={style.profileName /* todo: search result */}>
							<b>{this.state.user.displayName /* todo: search result */}</b>
							<span>@{this.state.user.username /* todo: search result */}</span>
						</div>
					</div>

					<div className={style.status}>{<p>{this.state.user.description}</p> /* todo: search result */}</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SearchCard;
