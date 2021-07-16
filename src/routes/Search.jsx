import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Post from '../components/Post';

import style from '../assets/css/routes/search.module.scss';
import { authenticationService } from '../services/authenticationService';
import config from '../config';
import SearchForm from '../components/SearchForm';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import mopsBraun from '../assets/images/mops-braun.jpg';
import noUsers from '../assets/images/no-users.jpg';

class Search extends Component {
	constructor(props) {
		super(props);

		const splittedSearch = props.location.search.split('=');
		if (splittedSearch.length > 2) return props.history.push('/');

		this.state = {
			query: splittedSearch[1],
			user: authenticationService.getUser(),
			loading: false,
			page: 0,

			posts: null,
			users: null,

			timeline: null,
		};

		this.currentUser = authenticationService.getUser();
		this.apiToken = authenticationService.getAPIToken();
	}

	componentDidMount() {
		this.searchCombined();
	}

	searchCombined = async () => {
		if (this.state.loading) return;

		this.setState({ loading: true });

		const response = await fetch(`${config.apiHost}/search/combined/${this.state.query}`, {
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();

			this.setState({
				posts: data.posts.results,
				users: data.users.results,
			});
		}

		this.setState({ loading: false });
	};

	toggleFollow = async (index) => {
		const users = this.state.users;
		let user = users[index];
		if (user.loadFollow) return;

		user.loadFollow = true;
		this.setState({ users: [...users] });

		const response = await fetch(`${config.apiHost}/user/${user.id}/${user.isFollowing ? 'unfollow' : 'follow'}`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			user = await response.json();
		}

		user.loadFollow = false;
		users[index] = user;

		this.setState({ users: [...users] });
	};

	removePost = (index) => {
		const posts = this.state.posts;
		posts.splice(index, 1);
		this.setState({ posts: [...posts] });
	};

	render() {
		return (
			<React.Fragment>
				<header className="App-header">
					<Navigation history={this.props.history} />
				</header>
				{this.state.loading ? (
					<div className={style.loading}>
						<FontAwesomeIcon spin={true} icon={faCircleNotch} />
						<span>Ergebnisse werden geladen</span>
					</div>
				) : (
					<div className={style.content}>
						<div className={style.leftContent}>
							{this.state.posts != null &&
								(this.state.posts.length > 0 ? (
									this.state.posts.map((post, index) => {
										return (
											<Post post={post} key={post.id} onDelete={() => this.removePost(index)} />
										);
									})
								) : (
									<div className={style.noResults}>
										<img src={mopsBraun} alt="Mops braune Decke" />
										<span>Der Mops hat leider die Beiträge gefressen</span>
									</div>
								))}
						</div>
						<div className={style.rightContent}>
							<div className={style.sticky}>
								<SearchForm />
								<div className={style.profileResults}>
									{this.state.users != null &&
										(this.state.users.length > 0 ? (
											this.state.users.map((user, index) => {
												return (
													<div key={index} className={style.user}>
														<Link to={`/profile/${user.username}`}>
															<img
																src={user.profilePictureUrl}
																alt={`Profilbild von ${user.displayName}`}
															/>
														</Link>
														<div className={style.info}>
															<b>{user.displayName}</b>
															<span>@{user.username}</span>
														</div>
														{(!this.currentUser || this.currentUser.id !== user.id) && (
															<button onClick={() => this.toggleFollow(index)}>
																{user.loadFollow && (
																	<span>
																		<FontAwesomeIcon
																			spin={true}
																			icon={faCircleNotch}
																		/>
																		&npsp;
																	</span>
																)}
																{user.isFollowing ? 'Folge ich' : 'Folgen'}
															</button>
														)}
													</div>
												);
											})
										) : (
											<div className={style.noResults}>
												<img src={noUsers} alt="Glücklicher Hund" />
												<span>Der Hund hat leider alle Profile verjagt</span>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Search;
