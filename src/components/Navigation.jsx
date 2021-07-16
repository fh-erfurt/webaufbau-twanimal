import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaw, faSmile, faDoorOpen, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from '../assets/css/components/navigation.module.scss';

import { authenticationService } from '../services/authenticationService';
import config from '../config';

class NavigationItem extends Component {
	render() {
		return (
			<Link to={this.props.target} className={styles.item}>
				<FontAwesomeIcon icon={this.props.icon} className={styles.itemIcon} />
				{this.props.text}
			</Link>
		);
	}
}

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: props.user || authenticationService.getUser(),
			toggleMenu: false,
		};
	}

	componentDidMount() {
		const user = authenticationService.getUser();

		if (user) this.validateSession();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) this.setState({ user: this.props.user });
	}

	validateSession = async () => {
		try {
			const response = await fetch(`${config.apiHost}/validate-session`, {
				headers: {
					Authorization: `Bearer ${authenticationService.getAPIToken()}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				const apiToken = data.apiToken;
				delete data.apiToken;

				authenticationService.storeSession({
					user: data,
					apiToken: apiToken,
				});

				this.setState({ user: data });
			} else {
				this.logout();
			}
		} catch (e) {
			this.logout();
		}
	};

	logout = () => {
		authenticationService.logout();
		this.props.history.push('/');
	};

	state = {};
	render() {
		return (
			<React.Fragment>
				<div className={styles.navigationContainer}>
					<div className={styles.navigation}>
						<div className={styles.container}>
							<div className={styles.logo}>
								<FontAwesomeIcon icon={faPaw} />
							</div>
							<div className={this.state.toggleMenu ? `${styles.items} ${styles.reveal}` : styles.items}>
								<NavigationItem text="Home" icon={faHome} target="/" />
								<NavigationItem text="Über uns" icon={faSmile} target="/ueber-uns" />
								<div className={styles.spacer}></div>
								<div className={styles.item} onClick={this.logout}>
									<FontAwesomeIcon icon={faDoorOpen} className={styles.itemIcon} />
									Abmelden
								</div>
							</div>
							<div
								className={styles.mobileToggle}
								onClick={() => this.setState({ toggleMenu: !this.state.toggleMenu })}>
								<FontAwesomeIcon icon={faBars} />
							</div>
							{this.state.user && (
								<Link to={'/profile/' + this.state.user.username} className={styles.profile}>
									<div className={styles.profileName}>
										<b>{this.state.user.displayName}</b>
										<span>@{this.state.user.username}</span>
									</div>
									<div
										className={styles.profileImage}
										style={{
											backgroundImage: `url(${this.state.user.profilePictureUrl})`,
										}}></div>
								</Link>
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Navigation;
