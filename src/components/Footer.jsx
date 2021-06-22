import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "../assets/css/components/footer.module.scss";

class Footer extends Component {
    state = {};
    render() {
      return (
          <React.Fragment>
              <div className={styles.footer}>
                <footer>
                    <p>
                        Copyright &copy; 2021 Twanimal UG (haftungsbeschränkt)
                        &nbsp;-&nbsp;
                        <Link to="/imprint">Impressum</Link>
                        &nbsp;-&nbsp;
                        <Link to="/privacy">Datenschutz</Link>
                    </p>
                </footer>
              </div>
          </React.Fragment>
      );
    }
}

export default Footer;

