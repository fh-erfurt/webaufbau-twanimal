import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import ProfileCard from '../components/ProfileCard';
import style from '../assets/css/routes/home.module.scss';
import { authenticationService } from '../services/authenticationService';
import config from '../config';
import Post from './../components/Post';
import NewPost from './../components/NewPost';

class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			replies: []
		};

		this.apiToken = authenticationService.getAPIToken();
	}

	componentDidMount() {
		this.getPost();
	}

	componentDidUpdate(prevProps) {
		console.log("hi")
		if (prevProps.match.params.id === this.props.match.params.id) return;
		this.getPost();
	}

	getPost = async () => {
		this.setState({ post: null, replies: [] })

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
		const replies = this.state.replies

		replies.unshift(post);

		this.setState({ replies: replies })
	}

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
							<div className={style.postContent}>
                				<Post post={ this.state.post } largeImages={ true } />
								<NewPost replyToPost={ this.state.post } onNewPost={this.onNewPost} />
								{ this.state.replies.map((post, index) => {
									return <Post post={post} key={post.id + '-' + index} />;
								}) }
							</div>
							<div className={style.profileCard}>
								<ProfileCard
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
					) : (
						<div>wird geladen</div>
					)}
				</body>
			</React.Fragment>
		);
	}
}

export default PostPage;
