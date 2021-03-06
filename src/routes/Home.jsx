import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import ProfileCard from '../components/ProfileCard';
import Post from '../components/Post';

import style from '../assets/css/routes/home.module.scss';
import { authenticationService } from '../services/authenticationService';
import { config } from '../config';
import NewPost from '../components/NewPost';
import SearchForm from '../components/SearchForm';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import timelineEmpty from '../assets/images/timeline-empty.jpg';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: authenticationService.getUser(),
			loading: false,
			page: 0,
			timeline: null,
		};

		this.apiToken = authenticationService.getAPIToken();
	}

	componentDidMount() {
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

	appendNewPost = (post) => {
		const timeline = this.state.timeline;
		timeline.unshift(post);
		this.setState({ timeline: timeline });
	};

	removePost = (index) => {
		const timeline = this.state.timeline;
		timeline.splice(index, 1);
		this.setState({ timeline: [...timeline] });
	};

	render() {
		return (
			<React.Fragment>
				<Navigation history={this.props.history} />
				<div className={style.content}>
					<div className={style.leftContent}>
						<NewPost onNewPost={this.appendNewPost} />
						{this.state.timeline != null ? (
							this.state.timeline.length === 0 ? (
								<div className={style.noResults}>
									<img src={timelineEmpty} alt="Fressende Meerschweinchen" />
									<span>Du folgst noch keinem Profil</span>
								</div>
							) : (
								this.state.timeline.map((post, index) => {
									return (
										<Post
											post={post}
											key={post.id + '-' + index}
											onDelete={() => this.removePost(index)}
										/>
									);
								})
							)
						) : (
							<div className={style.loadingPosts}>
								<FontAwesomeIcon spin={true} icon={faCircleNotch} />
								<span>Timeline wird geladen</span>
							</div>
						)}
					</div>
					<div className={style.rightContent}>
						<div className={style.sticky}>
							<SearchForm />
							<div className={style.profileCard}>
								<ProfileCard />
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
