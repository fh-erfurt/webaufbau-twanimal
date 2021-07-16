import React, { Component } from 'react';
import style from '../assets/css/components/editProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../config';
import { authenticationService } from '../services/authenticationService';
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';

class EditProfile extends Component {
	constructor(props) {
		super(props);

		this.apiToken = authenticationService.getAPIToken();
		const user = authenticationService.getUser();

		this.state = {
			user: user,
			profilePicture: null,
			profilePictureUrl: user.profilePictureUrl,
			displayName: user.displayName,
			username: user.username,
			description: user.description,
			email: user.email,
			newPassword: '',
			repeatNewPassword: '',
			updatingProfile: false,
			error: null,
			success: null,
		};
	}

	handleFile = (event) => {
		const files = event.target.files;
		if (files.length < 1) return;

		const file = files.item(0);

		if (file.type.indexOf('image/') === -1) return;

		if (this.state.profilePicture) URL.revokeObjectURL(this.state.profilePictureUrl);

		this.setState({
			profilePicture: file,
			profilePictureUrl: URL.createObjectURL(file),
		});
	};

	updateProfile = async (event) => {
		event.preventDefault();

		if (this.state.updatingProfile) return;
		this.setState({ updateProfile: true });

		const currentUser = this.state.user;

		const formData = new FormData();

		// Anhängen von geänderten Dateien

		if (this.state.profilePicture) formData.append('profilePicture', this.state.profilePicture);

		if (this.state.displayName !== currentUser.displayName) formData.append('displayName', this.state.displayName);

		if (this.state.username !== currentUser.username) formData.append('username', this.state.username);

		if (this.state.description !== currentUser.description) formData.append('description', this.state.description);

		if (this.state.email !== currentUser.email) formData.append('email', this.state.email);

		// Prüfen des Passworts, wenn eins eingegeben wurde

		if (this.state.newPassword.length > 0)
			if (this.state.newPassword !== this.state.repeatNewPassword)
				return this.setState({
					updateProfile: false,
					error: 'Passwörter müssen identisch sein',
					success: null,
				});
			else formData.append('password', this.state.newPassword);

		const response = await fetch(`${config.apiHost}/user/update`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			const apiToken = data.apiToken;
			delete data.apiToken;

			authenticationService.storeSession({
				user: data,
				apiToken: apiToken,
			});

			if (this.state.profilePicture) URL.revokeObjectURL(this.state.profilePictureUrl);

			this.setState({
				user: data,
				profilePicture: null,
				profilePictureUrl: data.profilePictureUrl,
				displayName: data.displayName,
				username: data.username,
				description: data.description,
				email: data.email,
				newPassword: '',
				repeatNewPassword: '',
				updatingProfile: false,
				error: null,
				success: 'Änderungen wurden gespeichert',
			});

			this.props.onUpdate(data);
		} else {
			let message = 'Unbekannter Fehler';
			const errorObject = await response.json();

			switch (errorObject.error) {
				case 'invalid email':
					message = 'Ungültige E-Mail Adresse';
					break;
				case 'invalid username':
					message = 'Ungültiger Nutzername';
					break;
				case 'invalid displayName':
					message = 'Ungültiger Name';
					break;
				case 'invalid password':
					message = 'Ungültiges Passwort';
					break;
				case 'invalid description':
					message = 'Ungültige Beschreibung';
					break;
				case 'email in use':
					message = 'E-Mail Adresse wird bereits verwendet';
					break;
				case 'username in use':
					message = 'Benutzername wird bereits verwendet';
					break;
				default:
					message = 'Unbekanter Fehler';
			}

			return this.setState({
				updateProfile: false,
				error: message,
				success: null,
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className={style.overlay}>
					<div className={style.inner}>
						<div className={style.content}>
							<form className={style.box} onSubmit={this.updateProfile}>
								<div className={style.close} onClick={() => this.props.onClose()}>
									<FontAwesomeIcon icon={faTimes} />
								</div>
								<h3>Profil bearbeiten</h3>
								{this.state.error && <div className={style.errorMessage}>{this.state.error}</div>}
								{this.state.success && <div className={style.successMessage}>{this.state.success}</div>}
								<div className={style.inputField}>
									<label className={style.profilePicture}>
										<span>Profilbild</span>
										<div>
											<img src={this.state.profilePictureUrl} alt="profilePicture" />
											<input type="file" accept="image/*" onChange={this.handleFile} />
										</div>
									</label>
								</div>
								<div className={style.inputField}>
									<label className={style.textInput}>
										<span>Anzeigename</span>
										<input
											type="text"
											placeholder="Name des Haustieres"
											value={this.state.displayName}
											onChange={(e) => this.setState({ displayName: e.target.value })}
											minLength="1"
											maxLength="120"
										/>
									</label>
								</div>
								<div className={style.inputField}>
									<label className={style.textInput}>
										<span>Nutzername</span>
										<input
											type="text"
											placeholder="Nutzername"
											value={this.state.username}
											onChange={(e) => this.setState({ username: e.target.value })}
											minLength="2"
											maxLength="40"
										/>
									</label>
								</div>
								<div className={style.inputField}>
									<label className={style.textInput}>
										<span>Beschreibung</span>
										<textarea
											placeholder="Stelle dich hier vor"
											defaultValue={this.state.description}
											maxLength="280"
											onChange={(e) => this.setState({ description: e.target.value })}></textarea>
									</label>
								</div>
								<div className={style.inputField}>
									<label className={style.textInput}>
										<span>E-Mail Adresse</span>
										<input
											type="email"
											placeholder="musterkatze@floki.de"
											value={this.state.email}
											onChange={(e) => this.setState({ email: e.target.value })}
										/>
									</label>
								</div>
								<div className={style.inputField}>
									<label className={style.textInput}>
										<span>Neues Passwort</span>
										<input
											type="password"
											value={this.state.newPassword}
											onChange={(e) => this.setState({ newPassword: e.target.value })}
											minLength="8"
											maxLength="200"
										/>
									</label>
									<label className={style.textInput}>
										<span>Passwort wiederholen</span>
										<input
											type="password"
											value={this.state.repeatNewPassword}
											onChange={(e) => this.setState({ repeatNewPassword: e.target.value })}
											minLength="8"
											maxLength="200"
										/>
									</label>
								</div>
								<div className={style.submitField}>
									<button>
										{this.state.updatingProfile && (
											<span>
												<FontAwesomeIcon spin={true} icon={faCircleNotch} />
												&nbsp;
											</span>
										)}
										Absenden
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default EditProfile;
