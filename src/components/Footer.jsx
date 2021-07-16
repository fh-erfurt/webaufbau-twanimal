import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../assets/css/components/footer.module.scss';

class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={styles.footer}>
					<footer>
						<p>
							Copyright &copy; 2021 Twanimal UG (haftungsbeschränkt) &nbsp;-&nbsp;
							<Link to="/impressum">Impressum</Link>
							&nbsp;-&nbsp;
							<Link to="/datenschutz">Datenschutz</Link>
						</p>
					</footer>
				</div>
			</React.Fragment>
		);
	}
}

export default Footer;
