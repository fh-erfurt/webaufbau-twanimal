import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/routes/form.module.scss';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import { authenticationService } from '../services/authenticationService';

import config from '../config';

export default function Login({ history }) {
	const [loggingIn, setLoggingIn] = useState(false);

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const [error, setError] = useState(null);

	const login = async (event) => {
		event.preventDefault();

		if (loggingIn) return;

		//evtl validator einbauen

		setLoggingIn(true);

		const response = await fetch(`${config.apiHost}/user/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
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
				case 'unknown user':
					message = 'Unbekannte E-Mail Adresse';
					break;
				case 'invalid password':
					message = 'Ungültige Anmeldedaten';
					break;
			}

			setError(message);

			setLoggingIn(false);
		}
	};

	return (
		<React.Fragment>
			<div className={style.page}>
				<div className={style.verticalCenter}>
					<div className={style.formTextContainer}>
						<div className={style.contentWraperImage}>
							<div className={style.logo}>
								<FontAwesomeIcon className={style.icons} icon={faPaw} />
							</div>
						</div>
						<div className={style.text}>
							<p>Melde dich bei Twanimal an</p>
						</div>
						<div className={style.form}>
							<form onSubmit={login}>
								{error && <div className={style.errorMessage}>{error}</div>}
								<div className={style.inputs}>
									<input
										type="email"
										placeholder="Email"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className={style.submitButton}>
									<button>
										{loggingIn && (
											<span>
												<FontAwesomeIcon spin={true} icon={faCircleNotch} />
												&nbsp;
											</span>
										)}
										Login
									</button>
								</div>
							</form>
						</div>
						<div className={style.link}>
							<Link to="/registration">Noch nicht Teil der Crew? Hier geht's zur Registration</Link>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</React.Fragment>
	);
}
