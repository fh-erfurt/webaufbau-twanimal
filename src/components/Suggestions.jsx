import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPaw } from "@fortawesome/free-solid-svg-icons"
import style from "../assets/css/components/Suggestions.module.scss"


class Suggestions extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
               

                    <div className={style.searchField}>
                        <form action="#">
                            <FontAwesomeIcon
                                className={style.icons}
                                icon={faSearch}
                            />
                            <input
                                type="text"
                                placeholder="Twanimal durchsuchen..."
                                name="search"
                            />
                        </form>
                        
                    </div>
                    <div className={style.box}>
                        <input 
                        type= "text"
                        placeholder= "Das könnte dich interessieren!"
                        />
                    </div>
               

			</React.Fragment>
	
		)
	}
}

export default Suggestions