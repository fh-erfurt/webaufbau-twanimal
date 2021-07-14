import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import ProfileCard from '../components/ProfileCard';
import style from '../assets/css/routes/post.module.scss';
import { authenticationService } from '../services/authenticationService';
import config from '../config';
import Post from './../components/Post';
import NewPost from './../components/NewPost';
import SearchForm from '../components/SearchForm';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import noContent from '../assets/images/no-content.jpg';

class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			replies: null,
			noPost: false,
		};

		this.apiToken = authenticationService.getAPIToken();
	}

	async componentDidMount() {
		await this.getPost();
		await this.loadReplies();
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.match.params.id === this.props.match.params.id) return;

		this.setState({ post: null, replies: null });

		await this.getPost();
		await this.loadReplies();
	}

	getPost = async () => {
		this.setState({ post: null, replies: null, noPost: false });

		const id = this.props.match.params.id;
		const response = await fetch(`${config.apiHost}/post/${id}`, {
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			const post = await response.json();
			this.setState({ post: post });
		} else if (response.status === 404) this.setState({ noPost: true });
	};

	onNewPost = (post) => {
		const replies = this.state.replies;

		replies.unshift(post);

		this.setState({ replies: replies });
	};

	loadReplies = async () => {
		const id = this.props.match.params.id;
		const response = await fetch(
			`${config.apiHost}/post/${id}/replies`,
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
			this.setState({ replies: data.results });
		}
	};

	removeReply = (index) => {
		const replies = this.state.replies;
		replies.splice(index, 1);
		this.setState({ replies: [...replies] });
	};

	removePost = () => {
		this.history.push('/');
	};

	state = {};
	render() {
		return (
			<React.Fragment>
				<header className="App-header">
					<Navigation history={this.props.history} />
				</header>
				<body>
					{this.state.noPost ? (
						<div className={style.noResults}>
							<img src={noContent} alt="Ängstliche Katze" />
							<span>Dieser Beitrag wurde verscheucht</span>
						</div>
					) : this.state.post ? (
						<div className={style.content}>
							<div className={`${style.leftContent} ${style.extraPadding}`}>
								<Post post={this.state.post} largeImages={true} onDelete={this.removePost} />
								<NewPost replyToPost={this.state.post} onNewPost={this.onNewPost} />
								{this.state.replies != null ? (
									this.state.replies.map((post, index) => {
										return (
											<Post
												post={post}
												key={post.id + '-' + index}
												onDelete={() => this.removeReply(index)}
											/>
										);
									})
								) : (
									<div className={style.loadingPosts}>
										<FontAwesomeIcon spin={true} icon={faCircleNotch} />
										<span>Antworten werden geladen</span>
									</div>
								)}
							</div>
							<div className={style.rightContent}>
								<div className={style.sticky}>
									<SearchForm />
									<div className={style.profileCard}>
										<ProfileCard user={this.state.post.createdBy} />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className={style.loadingPosts}>
							<FontAwesomeIcon spin={true} icon={faCircleNotch} />
							<span>Beitrag wird geladen</span>
						</div>
					)}
				</body>
			</React.Fragment>
		);
	}
}

export default PostPage;
