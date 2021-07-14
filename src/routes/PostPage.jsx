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

class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			replies: null,
		};

		this.apiToken = authenticationService.getAPIToken();
	}

	componentDidMount() {
		this.getPost();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id === this.props.match.params.id) return;
		this.getPost();
	}

	getPost = async () => {
		this.setState({ post: null, replies: [] });

		const id = this.props.match.params.id;
		const response = await fetch(`${config.apiHost}/post/${id}`, {
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			const post = await response.json();
			this.setState({ post: post });
		}
	};

	onNewPost = (post) => {
		const replies = this.state.replies;

		replies.unshift(post);

		this.setState({ replies: replies });
	};

	state = {};
	render() {
		return (
			<React.Fragment>
				<header className="App-header">
					<Navigation />
				</header>
				<body>
					{this.state.post ? (
						<div className={style.content}>
							<div className={`${style.leftContent} ${style.extraPadding}`}>
								<Post post={this.state.post} largeImages={true} />
								<NewPost replyToPost={this.state.post} onNewPost={this.onNewPost} />
								{this.state.replies != null ? (
									this.state.replies.map((post, index) => {
										return <Post post={post} key={post.id + '-' + index} />;
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
						<div className={style.loading}>
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
