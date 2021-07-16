import {
	faCat,
	faCircleNotch,
	faDog,
	faDove,
	faFrog,
	faHorseHead,
	faImages,
	faOtter,
	faSearch,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import style from '../assets/css/components/newPost.module.scss';
import { config } from '../config';
import { authenticationService } from '../services/authenticationService';

class NewPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: authenticationService.getUser(),
			attachements: [],
			content: '',
			isSubmitting: false,

			giphyOpen: false,
			giphyType: 'gifs',
			giphyResults: null,
			giphyQuery: '',
		};

		this.apiToken = authenticationService.getAPIToken();

		this.randomTypes = [
			{ name: 'Katzen', icon: faCat, query: 'cat' },
			{ name: 'Hunde', icon: faDog, query: 'dog' },
			{ name: 'Vögel', icon: faDove, query: 'bird' },
			{ name: 'Pferde', icon: faHorseHead, query: 'horse' },
			{ name: 'Otter', icon: faOtter, query: 'otter' },
			{ name: 'Frösche', icon: faFrog, query: 'frog' },
		];
	}

	canAttachFiles = (origin = 'all') => {
		const attachements = this.state.attachements;

		if (attachements.length === 0) return true;
		if (origin !== 'all') return false;
		if (attachements.length >= 4) return false;

		for (const attachement of attachements) if (attachement.isGif) return false;

		return true;
	};

	handleFile = (event) => {
		if (!this.canAttachFiles()) return;

		const files = event.target.files;
		const attachements = this.state.attachements;
		let gifAttached = false;

		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);
			const isGif = file.type === 'image/gif';
			if (isGif) gifAttached = true;

			attachements.push({
				isGif: isGif,
				file: file,
				preview: URL.createObjectURL(file),
			});

			if (attachements.length >= 4 || gifAttached) break;
		}

		this.setState({ attachements: attachements });
	};

	removeFile = (index) => {
		const attachements = this.state.attachements;

		const file = attachements[index];

		URL.revokeObjectURL(file.preview);

		attachements.splice(index, 1);

		this.setState({
			attachements: attachements,
		});
	};

	loadFromGiphy = async (type = 'gifs', query = null) => {
		const response = await fetch(
			`https://api.giphy.com/v1/${type}/${query ? 'search' : 'trending'}?api_key=${
				config.giphyApiToken
			}&q=${query}`
		);

		if (response.ok) {
			const data = await response.json();

			this.setState({ giphyResults: data });
		}
	};

	toggleGiphyPicker = async () => {
		if (this.state.giphyOpen) return this.setState({ giphyOpen: false });

		this.setState({ giphyOpen: true, giphyType: 'gifs', giphyQuery: '' });
		this.loadFromGiphy();
	};

	switchGiphyType = async (type) => {
		if (this.state.giphyType === type) return;
		this.setState({ giphyType: type, giphyResults: null });

		if (type !== 'random') await this.loadFromGiphy(type);
	};

	/**
	 * Lädt das ausgewählte Gif runter als blob und fügt die Datei als Anhang hinzu
	 */
	selectGif = async (item) => {
		const response = await fetch(item.images.original.url);
		const data = await response.blob();

		const file = new File([data], `${item.images.original.hash}.gif`, { type: 'image/gif' });

		this.setState({
			giphyOpen: false,
			attachements: [
				{
					isGif: true,
					file: file,
					preview: URL.createObjectURL(file),
				},
			],
		});
	};

	searchGiphy = async () => {
		this.setState({ giphyResults: null });
		await this.loadFromGiphy(this.state.giphyType, this.state.giphyQuery);
	};

	handleGiphyKeyDown = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			await this.searchGiphy();
		}
	};

	randomGif = async (item) => {
		const response = await fetch(
			`https://api.giphy.com/v1/gifs/random?api_key=${config.giphyApiToken}&tag=${item.query}`
		);

		if (response.ok) {
			const data = await response.json();

			await this.selectGif(data.data);
		}
	};

	submitPost = async (event) => {
		event.preventDefault();

		if (this.state.isSubmitting || (this.state.attachements.length === 0 && this.state.content.length === 0))
			return;

		this.setState({ isSubmitting: true });

		const text = this.state.content;
		const attachements = this.state.attachements;

		const formData = new FormData();
		formData.append('text', text);

		if (this.props.replyToPost) formData.append('replyToId', this.props.replyToPost.id);

		for (const attachement of attachements) formData.append('attachements', attachement.file);

		const response = await fetch(`${config.apiHost}/post/new`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
			body: formData,
		});

		if (response.ok) {
			const post = await response.json();

			this.props.onNewPost(post);

			for (const attachement of attachements) URL.revokeObjectURL(attachement.preview);

			this.setState({
				isSubmitting: false,
				attachements: [],
				content: '',
			});
		} else {
			alert('Der Beitrag konnte nicht gesendet werden.');

			this.setState({ isSubmitting: false });
		}
	};

	render() {
		return (
			<React.Fragment>
				<form className={style.newPost} onSubmit={this.submitPost}>
					<div className={style.newPostRow}>
						<Link to={`/profile/${this.state.user.username}`}>
							<img
								className={style.profileImage}
								src={this.state.user.profilePictureUrl}
								alt="profileImage"
							/>
						</Link>
						<div className={style.postContent}>
							<textarea
								placeholder={this.props.replyToPost ? 'Schreibe Deine Antwort' : 'Was gibts neues?'}
								value={this.state.content}
								onChange={(e) => this.setState({ content: e.target.value })}></textarea>
							{this.state.attachements.length > 0 && (
								<div className={style.attachements}>
									{this.state.attachements.map((attachement, index) => {
										return (
											<div
												key={index}
												className={style.attachement}
												style={{
													backgroundImage: `url(${attachement.preview})`,
												}}>
												<div onClick={() => this.removeFile(index)}>
													<FontAwesomeIcon icon={faTimes} />
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
					<div className={style.actionRow}>
						{this.canAttachFiles('all') && (
							<div className={style.imageButton}>
								<FontAwesomeIcon className={style.icons} icon={faImages} />
								<input type="file" accept="image/*" multiple onChange={this.handleFile} />
							</div>
						)}
						{this.canAttachFiles('gifs') && (
							<div className={style.gifButton}>
								<span onClick={this.toggleGiphyPicker}>GIF</span>
								<div
									className={
										this.state.giphyOpen
											? `${style.giphyPicker} ${style.reveal}`
											: style.giphyPicker
									}>
									<div className={style.header}>
										<div
											onClick={() => this.switchGiphyType('gifs')}
											className={this.state.giphyType === 'gifs' ? style.active : null}>
											Gifs
										</div>
										<div
											onClick={() => this.switchGiphyType('stickers')}
											className={this.state.giphyType === 'stickers' ? style.active : null}>
											Sticker
										</div>
										<div
											onClick={() => this.switchGiphyType('random')}
											className={this.state.giphyType === 'random' ? style.active : null}>
											Zufällig
										</div>
									</div>
									{this.state.giphyType !== 'random' ? (
										<div>
											<div className={style.search}>
												<input
													type="text"
													placeholder="Suche nach Gifs und Stickern"
													value={this.state.giphyQuery}
													onKeyDown={this.handleGiphyKeyDown}
													onChange={(e) => this.setState({ giphyQuery: e.target.value })}
												/>
												<button type="button" onClick={this.searchGiphy}>
													<FontAwesomeIcon icon={faSearch} className={style.icon} />
												</button>
											</div>
											{this.state.giphyResults == null ? (
												<div className={style.loading}>
													<FontAwesomeIcon spin={true} icon={faCircleNotch} />
												</div>
											) : (
												this.state.giphyType !== 'random' && (
													<div className={style.results}>
														{this.state.giphyResults.data.map((item, index) => {
															return (
																<img
																	src={item.images.preview_gif.url}
																	onClick={() => this.selectGif(item)}
																	key={index}
																	alt={item.title}
																/>
															);
														})}
													</div>
												)
											)}
										</div>
									) : (
										<div className={style.results}>
											{this.randomTypes.map((item, index) => {
												return (
													<div
														className={style.item}
														key={index}
														onClick={() => this.randomGif(item)}>
														<FontAwesomeIcon icon={item.icon} />
														<span>{item.name}</span>
													</div>
												);
											})}
										</div>
									)}
								</div>
							</div>
						)}
						<div className={style.spacer}></div>
						<button
							className={
								this.state.attachements.length === 0 && this.state.content.length === 0
									? style.disabled
									: null
							}>
							{this.state.isSubmitting && (
								<span>
									<FontAwesomeIcon spin={true} icon={faCircleNotch} />
									&nbsp;
								</span>
							)}
							Wuff
						</button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default NewPost;
