import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/routes/form.module.scss';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import { authenticationService } from '../services/authenticationService';

import { config } from '../config';

class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inRegistration: false,
			email: '',
			username: '',
			displayName: '',
			password: '',
			passwordRepeat: '',
			error: null,
		};
	}

	registration = async (event) => {
		event.preventDefault();

		if (this.state.inRegistration) return;

		if (this.state.password !== this.state.passwordRepeat) {
			this.setState({ error: 'Passwörter müssen identisch sein' });
			return;
		}

		this.setState({ inRegistration: true });

		const response = await fetch(`${config.apiHost}/user/registration`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.state.email,
				username: this.state.username,
				displayName: this.state.displayName,
				password: this.state.password,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			const apiToken = data.apiToken;
			delete data.apiToken;

			authenticationService.storeSession({
				user: data,
				apiToken: apiToken,
			});

			this.props.history.push('/');
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
				case 'email in use':
					message = 'E-Mail Adresse wird bereits verwendet';
					break;
				case 'username in use':
					message = 'Benutzername wird bereits verwendet';
					break;
				default:
					message = 'Unbekanter Fehler';
			}
			this.setState({
				error: message,
				inRegistration: false,
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className={style.page}>
					<div className={style.verticalCenter}>
						<div className={style.registrationTextContainer}>
							<div className={style.contentWraperImage}>
								<div className={style.logo}>
									<FontAwesomeIcon className={style.icons} icon={faPaw} />
								</div>
							</div>
							<div className={style.text}>
								<p>Erstelle einen neuen Account bei Twanimal</p>
							</div>
							<div className={style.form}>
								<form onSubmit={this.registration}>
									{this.state.error && <div className={style.errorMessage}>{this.state.error}</div>}
									<div className={style.inputs}>
										<input
											type="text"
											placeholder="Name des Haustieres"
											value={this.state.displayName}
											onChange={(e) => this.setState({ displayName: e.target.value })}
											required
											minLength="1"
											maxLength="120"
										/>
										<input
											type="text"
											placeholder="Nutzername"
											value={this.state.username}
											onChange={(e) => this.setState({ username: e.target.value })}
											required
											minLength="2"
											maxLength="40"
										/>
										<input
											type="email"
											placeholder="Email"
											value={this.state.email}
											onChange={(e) => this.setState({ email: e.target.value })}
											required
										/>
										<div className={style.passwordInput}>
											<input
												id="passwordConfirmLeft"
												type="password"
												placeholder="Passwort"
												value={this.state.password}
												onChange={(e) => this.setState({ password: e.target.value })}
												required
												minLength="8"
												maxLength="200"
											/>
											<input
												id="passwordConfirmRight"
												type="password"
												placeholder="Passwort wiederholen"
												value={this.state.passwordRepeat}
												onChange={(e) => this.setState({ passwordRepeat: e.target.value })}
												required
												minLength="8"
												maxLength="200"
											/>
										</div>
									</div>
									<div className={style.submitButton}>
										<button>
											{this.state.inRegistration && (
												<span>
													<FontAwesomeIcon spin={true} icon={faCircleNotch} />
													&nbsp;
												</span>
											)}
											Registrieren
										</button>
									</div>
								</form>
							</div>
							<div className={style.link}>
								<Link to="/login">Doch schon Teil der Crew? Hier geht's zur Anmeldung!</Link>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}
export default Registration;
