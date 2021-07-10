import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/routes/page404.module.scss';
import { Link } from 'react-router-dom';

import mopsBraun from '../assets/images/mops-braun.jpg';
import mopsKariert from '../assets/images/mops-kariert.jpg';
import mopsPluesch from '../assets/images/mops-pluesch.jpg';

class Page404 extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className={style.notFoundPage}>
					<div className={style.pugPictures}>
						<img src={mopsBraun} alt="Mops braune Decke" />
						<img src={mopsKariert} alt="Mops karierte Decke" />
						<img src={mopsPluesch} alt="Mops flauschige Decke" />
					</div>
					<div className={style.notFoundText}>
						<FontAwesomeIcon className={style.icons} icon={faPaw} />
						<h1>404</h1>
						<h2>page not found</h2>
						<p>
							Hoppla! Scheinbar hat eins der Tiere die von dir gesuchte Seite zerfetzt... Sorry!
							<br />
							Der hohe Rat der Mops-Burritos wird dich nun zurückbegleiten.
						</p>
					</div>
					<div className={style.returnHolder}>
						<Link to="/">Zurück zur Startseite</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Page404;
