import React, { Component } from 'react';
import style from '../assets/css/components/post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { authenticationService } from '../services/authenticationService';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { utilityService } from './../services/utilityService';

class Post extends Component {
	constructor(props) {
		super(props);

		this.apiToken = authenticationService.getAPIToken();

		this.state = {
			post: this.props.post,
			isLiking: false,
		};

		this.currentUser = authenticationService.getUser();
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
		if (this.state.isLiking || !this.currentUser) return;
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

	deletePost = async () => {
		if (!window.confirm('Möchtest du den Beitrag wirklich löschen?')) return;

		const response = await fetch(`${config.apiHost}/post/${this.state.post.id}/delete`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
		});

		if (!response.ok) alert('Der Beitrag konnte nicht gelöscht werden.');

		this.props.onDelete();
	};

	getPostMessage = () => {
		return `Schau dir den Beitrag von ${this.state.post.createdBy.displayName} an: https://twanimal.de/${this.state.post.id}`;
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
							<span>@{this.state.post.createdBy.username}</span>
						</div>
						<div className={style.right}>
							<Link to={`/post/${this.state.post.id}`} className={style.postTime}>
								<b>{this.getDate()}</b>
							</Link>
							{this.currentUser != null && this.currentUser.id === this.state.post.createdBy.id && (
								<div className={style.delete} onClick={this.deletePost}>
									<FontAwesomeIcon className={style.icons} icon={faTrash} />
								</div>
							)}
						</div>
					</div>
					<div className={style.postMessage}>
						{this.state.post.replyTo && (
							<b>
								Kommentar zum <Link to={`/post/${this.state.post.replyTo.id}`}>Post</Link> von{' '}
								<Link to={`/profile/${this.state.post.replyTo.createdBy.username}`}>
									@{this.state.post.replyTo.createdBy.username}
								</Link>
							</b>
						)}
						<div
							className={style.text}
							dangerouslySetInnerHTML={{
								__html: utilityService.nl2br(utilityService.stripTags(this.state.post.text)),
							}}></div>
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
											<img src={attachement} alt="Anhang" />
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className={style.postActions}>
						<div
							className={`${style.action} ${style.like} ${this.state.post.hasLiked ? style.active : ''}`}>
							<FontAwesomeIcon
								onClick={this.likePost}
								icon={this.state.isLiking ? faCircleNotch : faHeart}
								spin={this.state.isLiking}
							/>
							{this.state.post.likeCount > 0 && <span>{this.state.post.likeCount}</span>}
						</div>
						<Link to={`/post/${this.state.post.id}`} className={style.action}>
							<FontAwesomeIcon className={style.icons} icon={faComment} />
						</Link>
						<a href={`mailto:?body=${this.getPostMessage()}`} className={style.action}>
							<FontAwesomeIcon className={style.icons} icon={faEnvelope} />
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Post;
