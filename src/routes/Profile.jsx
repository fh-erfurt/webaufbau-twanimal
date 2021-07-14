import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import style from '../assets/css/routes/profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaw, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Suggestions from '../components/Suggestions';
import config from '../config';
import { authenticationService } from '../services/authenticationService';
import Post from '../components/Post';
import EditProfile from './../components/EditProfile';
import { utilityService } from './../services/utilityService';
import SearchForm from '../components/SearchForm';

import sadCat from '../assets/images/sad-cat.jpg';
import noContent from '../assets/images/no-content.jpg';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			posts: null,
			loadFollow: false,
			showEditPopup: false,
			navigationUser: null,
			noUser: false,
		};

		this.apiToken = authenticationService.getAPIToken();
		this.currentUser = authenticationService.getUser();
	}

	componentDidMount() {
		this.getUser();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id === this.props.match.params.id) return;
		this.getUser();
	}

	getUser = async (resetState = true, loadPosts = true) => {
		if (resetState) this.setState({ user: null, posts: null, noUser: false });

		const id = this.props.match.params.id;
		const response = await fetch(
			`${config.apiHost}/user/${id}`,
			this.apiToken
				? {
						headers: {
							Authorization: `Bearer ${this.apiToken}`,
						},
				  }
				: null
		);

		if (response.ok) {
			const user = await response.json();
			this.setState({ user: user });
			if (loadPosts) await this.getPosts();
		} else if (response.status === 404) this.setState({ noUser: true });
	};

	getPosts = async () => {
		const id = this.props.match.params.id;
		const response = await fetch(
			`${config.apiHost}/user/${id}/posts`,
			this.apiToken
				? {
						headers: {
							Authorization: `Bearer ${this.apiToken}`,
						},
				  }
				: null
		);

		if (response.ok) {
			const data = await response.json();
			this.setState({ posts: data.results });
		}
	};

	toggleFollow = async () => {
		if (this.state.loadFollow) return;
		this.setState({ loadFollow: true });

		const id = this.props.match.params.id;
		const response = await fetch(
			`${config.apiHost}/user/${id}/${this.state.user.isFollowing ? 'unfollow' : 'follow'}`,
			{
				method: 'post',
				headers: {
					Authorization: `Bearer ${this.apiToken}`,
				},
			}
		);

		if (response.ok) {
			const user = await response.json();
			this.setState({ user: user });
		}

		this.setState({ loadFollow: false });
	};

	updateUser = (user) => {
		this.setState({ user: user, navigationUser: user });
	};

	removePost = (index) => {
		const posts = this.state.posts;
		posts.splice(index, 1);
		this.setState({ posts: [...posts] });
		this.getUser(false, false);
	};

	render() {
		return (
			<React.Fragment>
				<Navigation history={this.props.history} user={this.state.navigationUser} />
				{this.state.noUser ? (
					<div className={style.noResults}>
						<img src={noContent} alt="Ängstliche Katze" />
						<span>Dieses Profil hat Angst und hat sich versteckt</span>
					</div>
				) : this.state.user ? (
					<div className={style.content}>
						{this.state.showEditPopup && (
							<EditProfile
								user={this.state.user}
								onUpdate={this.updateUser}
								onClose={() => this.setState({ showEditPopup: false })}
							/>
						)}
						<div className={style.profileContent}>
							<div className={style.background}></div>
							<div className={style.profile}>
								<div className={style.profileRow}>
									<div className={style.profileImage}>
										<img src={this.state.user.profilePictureUrl} alt="profileImage" />
									</div>
									<div className={style.spacer}></div>
									{this.currentUser &&
										(this.currentUser.id !== this.state.user.id ? (
											<button onClick={this.toggleFollow}>
												{this.state.loadFollow && (
													<span>
														<FontAwesomeIcon spin={true} icon={faCircleNotch} />
														&nbsp;
													</span>
												)}
												{this.state.user.isFollowing ? 'Folge ich' : 'Folgen'}
											</button>
										) : (
											<button onClick={() => this.setState({ showEditPopup: true })}>
												Profil bearbeiten
											</button>
										))}
								</div>
								<div className={style.profileDetails}>
									<div className={style.profileName}>
										<b>{this.state.user.displayName}</b>
										<span>@{this.state.user.username}</span>
									</div>
									<div
										className={style.description}
										dangerouslySetInnerHTML={{
											__html: utilityService.nl2br(
												utilityService.stripTags(this.state.user.description)
											),
										}}></div>
									<div className={style.stats}>
										<div>
											<b>{this.state.user.postCount} Beiträge</b>
										</div>
										<div>
											<b>{this.state.user.followerCount} Follower</b>
										</div>
										<div>
											<b>{this.state.user.followingCount} Freunde</b>
										</div>
									</div>
								</div>
							</div>
							{this.state.posts != null ? (
								this.state.posts.length === 0 ? (
									<div className={style.noResults}>
										<img src={sadCat} alt="Traurige Katze" />
										<span>{this.state.user.displayName} hat noch lieber geschlafen als Beiträge zu erstellen...</span>
									</div>
								) : (
									this.state.posts.map((post, index) => {
										return (
											<Post post={post} key={post.id} onDelete={() => this.removePost(index)} />
										);
									})
								)
							) : (
								<div className={style.loadingPosts}>
									<FontAwesomeIcon spin={true} icon={faCircleNotch} />
									<span>Beiträge werden geladen</span>
								</div>
							)}
						</div>
						<div className={style.suggestionContent}>
							<div className={style.sticky}>
								<SearchForm />
								<div className={style.suggestions}>
									<Suggestions currentUser={this.state.user} />
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className={style.loading}>
						<FontAwesomeIcon spin={true} icon={faCircleNotch} />
						<span>Profil wird geladen</span>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Profile;
