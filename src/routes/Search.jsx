import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import SearchCard from '../components/SearchCard';
import Post from '../components/Post';

import style from '../assets/css/routes/home.module.scss';
import { authenticationService } from '../services/authenticationService';
import config from '../config';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: authenticationService.getUser(),
			loading: false,
			page: 0,
			timeline: null,
		};

		this.apiToken = authenticationService.getAPIToken();

		this.getHomeTimeline();
	}

	getHomeTimeline = async () => {
		if (this.state.loading) return;

		this.setState({ loading: true });

		const response = await fetch(`${config.apiHost}/home-timeline`, {
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			this.setState({ timeline: data.results, page: data.page });
		}

		this.setState({ loading: false });
	};

	// todo: search result
	appendNewPost = (post) => {
		console.log(post);
		const timeline = this.state.timeline;
		console.log(timeline.length, timeline);
		timeline.unshift(post);
		console.log(timeline.length, timeline);
		this.setState({ timeline: timeline });
	};

	render() {
		return (
			<React.Fragment>
				<header className="App-header">
					<Navigation history={this.props.history} />
				</header>
				<div className={style.content}>
					<div className={style.postContent}>
						{/* hier kommt search logik  */}
						{this.state.timeline != null &&
							this.state.timeline.map((post, index) => {
								return <Post post={post} key={index} />;
							})}
					</div>
					<div className={style.profileCard}>
						<SearchCard
							user={{
								photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
								username: 'Hanni',
								displayName: 'the dog',
								numberOfAllPosts: 12,
								numberOfAllFollower: 400,
								namberOfAllFriends: 40,
								status: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
							}}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Search;
