import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/routes/form.module.scss';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import { authenticationService } from '../services/authenticationService';

import config from '../config';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggingIn: false,
			email: '',
			password: '',
			error: null,
		};
	}

	login = async (event) => {
		event.preventDefault();

		if (this.state.loggingIn) return;

		//evtl validator einbauen

		this.setState({ loggingIn: true });

		const response = await fetch(`${config.apiHost}/user/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.email,
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
				case 'unknown user':
					message = 'Unbekannte E-Mail Adresse';
					break;
				case 'invalid password':
					message = 'Ungültige Anmeldedaten';
					break;
				default:
					message = 'Unbekanter Fehler';
			}

			this.setState({
				error: message,
				loggingIn: false,
			});
		}
	};

	render() {
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
								<form onSubmit={this.login}>
									{this.state.error && <div className={style.errorMessage}>{this.state.error}</div>}
									<div className={style.inputs}>
										<input
											type="email"
											placeholder="Email"
											required
											value={this.state.email}
											onChange={(e) => this.setState({ email: e.target.value })}
										/>
										<input
											type="password"
											placeholder="Password"
											required
											value={this.state.password}
											onChange={(e) => this.setState({ password: e.target.value })}
										/>
									</div>
									<div className={style.submitButton}>
										<button>
											{this.state.loggingIn && (
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
}

export default Login;
