import React, { Component } from 'react';
import style from '../assets/css/routes/aboutUs.module.scss';
import catdog from '../assets/images/catdog.jpg';
import dogs from '../assets/images/dogs.jpg';
import cathuman from '../assets/images/cathuman.jpg';
import snake from '../assets/images/snake.jpg';
import animals from '../assets/images/animals.jpg';
import corgi from '../assets/images/corgi.jpg';
import nemo from '../assets/images/nemo.jpg';
import gecko from '../assets/images/gecko.jpg';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

class AboutUs extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className={style.abousUsPage}>
					<div className={style.aboutPics}>
						<img src={cathuman} alt="Katze und Mensch" />
						<img src={catdog} alt="Katze und Hund" />
						<img src={animals} alt="Tiere und Menschen" />
						<img src={dogs} alt="Hunde" />
					</div>
					<div className={style.aboutUsHeading}>
						<h1>Über uns</h1>
						<h2>Das ist Twanimal!</h2>
					</div>
					<div className={style.aboutUsText}>
						<p>
							Wir sind Twanimal. Ein soziales Netzwerk für dein Hautier.
							<br />
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							<br />
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
							takimata sanctus est Lorem ipsum dolor sit amet.
							<br />
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							<br />
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
							takimata sanctus est Lorem ipsum dolor sit amet.
						</p>
					</div>
					<div className={style.aboutPics}>
						<img src={snake} alt="Schlange" />
						<img src={nemo} alt="Clownsfisch" />
						<img src={corgi} alt="Corgi" />
						<img src={gecko} alt="Gecko" />
					</div>
					<div className={style.aboutUsText}>
						<p>
							{' '}
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore.
							<br />
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							<br />
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
							takimata sanctus est Lorem ipsum dolor sit amet.
						</p>
					</div>
                    <div className={style.returnHolder}>
                        <Link to="/">Zurück zur Startseite</Link>
                    </div>

					<Footer />
				</div>
			</React.Fragment>
		);
	}
}

export default AboutUs;
