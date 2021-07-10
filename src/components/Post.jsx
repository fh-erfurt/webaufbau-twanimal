import React, { Component } from 'react';
import style from '../assets/css/components/post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '../config';
import { authenticationService } from '../services/authenticationService';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

class Post extends Component {
	constructor(props) {
		super(props);

		this.apiToken = authenticationService.getAPIToken();

		this.state = {
			post: this.props.post,
			isLiking: false,
		};
	}

	getDate = () => {
		const date = new Date(this.state.post.createdAt);
		const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

		if (this.state.post.createdAt + 1000 * 60 * 60 * 24 < Date.now()) {
			const month = months[date.getMonth()];
			const day = date.getDate();

			return day + '. ' + month;
		} else {
			let hour = date.getHours();
			let minute = date.getMinutes();

			if (hour < 10) hour = '0' + hour;
			if (minute < 10) minute = '0' + minute;

			return hour + ':' + minute + ' Uhr';
		}
	};

	likePost = async () => {
		if (this.state.isLiking) return;
		this.setState({ isLiking: true });

		let post = this.state.post;
		const hasLiked = post.hasLiked;

		const response = await fetch(`${config.apiHost}/post/${post.id}/${hasLiked ? 'unlike' : 'like'}`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (response.ok) {
			let post = await response.json();
			this.setState({
				post: post,
			});
		}

		this.setState({ isLiking: false });
	};

	render() {
		return (
			<React.Fragment>
				<div className={style.post}>
					<div className={style.userInfo}>
						<div className={style.profileImage}>
							<Link to={`/profile/${this.state.post.createdBy.username}`}>
								<img src={this.state.post.createdBy.profilePictureUrl} alt="pImage" />
							</Link>
						</div>
						<div className={style.profileName}>
							<b>{this.state.post.createdBy.displayName}</b>
							<Link to="/">
								@<span>{this.state.post.createdBy.username}</span>
							</Link>
						</div>
						<div className={style.postTime}>
							<b>{this.getDate()}</b>
						</div>
					</div>
					<div className={style.postMessage}>
						<p>
							{ this.state.post.replyTo && <b>Kommentar zum <Link to={`/post/${this.state.post.replyTo.id}`}>Post</Link> von <Link to={`/profile/${this.state.post.replyTo.createdBy.username}`}>@{ this.state.post.replyTo.createdBy.username }</Link></b> }
							{this.state.post.text}
							</p>
						{this.state.post.attachements.length > 0 && (
							<div
								className={
									this.props.largeImages
										? `${style.postImages} ${style.largeImages}`
										: style.postImages
								}>
								{this.state.post.attachements.map((attachement, index) => {
									return (
										<div className={style.postImage} key={index}>
											<img src={attachement} />
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className={style.postActions}>
						<FontAwesomeIcon
							onClick={this.likePost}
							className={`${style.icons} ${style.like} ${this.state.post.hasLiked ? style.active : ''}`}
							icon={this.state.isLiking ? faCircleNotch : faHeart}
							spin={this.state.isLiking}
						/>
						<Link to={`/post/${this.state.post.id}`}><FontAwesomeIcon className={style.icons} icon={faComment} /></Link>
						<FontAwesomeIcon className={style.icons} icon={faRetweet} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Post;
