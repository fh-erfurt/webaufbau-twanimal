import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/routes/form.module.scss';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import { authenticationService } from '../services/authenticationService';

import config from '../config';

export default function Registration({ history }) {
	const [inRegistration, setInRegistration] = useState(false);

	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [displayName, setDisplayName] = useState();
	const [password, setPassword] = useState();
	const [passwordRepeat, setPasswordRepeat] = useState();

	const [error, setError] = useState(null);

	const registration = async (event) => {
		event.preventDefault();

		if (inRegistration) return;

		if (password !== passwordRepeat) {
			setError('Passwörter müssen identisch sein');
			return;
		}

		setInRegistration(true);

		const response = await fetch(`${config.apiHost}/user/registration`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				username: username,
				displayName: displayName,
				password: password,
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

			history.push('/');
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
			}
			setError(message);
			setInRegistration(false);
		}
	};

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
							<form onSubmit={registration}>
								{error && <div className={style.errorMessage}>{error}</div>}
								<div className={style.inputs}>
									<input
										type="text"
										placeholder="Name des Haustieres"
										onChange={(e) => setDisplayName(e.target.value)}
										required
										minLength="1"
										maxLength="120"
									/>
									<input
										type="text"
										placeholder="Nutzername"
										onChange={(e) => setUsername(e.target.value)}
										required
										minLength="2"
										maxLength="40"
									/>
									<input
										type="email"
										placeholder="Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
									<div className={style.passwordInput}>
										<input
											id="passwordConfirmLeft"
											type="password"
											placeholder="Passwort"
											onChange={(e) => setPassword(e.target.value)}
											required
											minLength="8"
											maxLength="200"
										/>
										<input
											id="passwordConfirmRight"
											type="password"
											placeholder="Passwort wiederholen"
											onChange={(e) => setPasswordRepeat(e.target.value)}
											required
											minLength="8"
											maxLength="200"
										/>
									</div>
								</div>
								<div className={style.submitButton}>
									<button>
										{inRegistration && (
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
