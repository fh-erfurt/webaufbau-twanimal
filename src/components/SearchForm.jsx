import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from '../assets/css/components/searchForm.module.scss';

class SearchForm extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={style.searchField}>
					<form action="/suche" method="GET">
						<FontAwesomeIcon className={style.icons} icon={faSearch} />
						<input type="text" placeholder="Twanimal durchsuchen..." name="search" />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default SearchForm;
