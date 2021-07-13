import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import style from "../assets/css/components/Suggestions.module.scss"
import config from '../config';
import { authenticationService } from "../services/authenticationService";

class Suggestions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            suggestions: null,
            page: 0,
            moreAvailable: false,
            loadMore: false
        }

        this.apiToken = authenticationService.getAPIToken();
    }

    componentDidMount() {
        this.loadSuggestions();
    }

    loadSuggestions = async (page = 0) => {
        const response = await fetch(`${ config.apiHost }/suggestions?limit=3&page=${ page }`, {
			headers: {
				Authorization: `Bearer ${ this.apiToken }`,
			}
        })

        if(response.ok) {
            const data = await response.json();
            let results = data.results;
            if(page > 0) results = [...this.state.suggestions, ...results];

            this.setState({ suggestions: results, page: data.page, moreAvailable: data.moreAvailable, loadMore: false })
        }
    }

    loadNextPage = async () => {
        if(this.state.loadMore) return;
        this.setState({ loadMore: true })
        await this.loadSuggestions(this.state.page + 1);
    }

    toggleFollow = async (index) => {
        const suggestions = this.state.suggestions;
        let user = suggestions[index];
        if(user.loadFollow) return;

        user.loadFollow = true;
        this.setState({ suggestions: [... suggestions] });

        const response = await fetch(`${config.apiHost}/user/${ user.id }/${ user.isFollowing ? 'unfollow' : 'follow' }`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${ this.apiToken }`
            },
        });

        if(response.ok) {
            user = await response.json();
        }

        user.loadFollow = false;
        suggestions[index] = user;

        this.setState({ suggestions: [... suggestions] });
    }

    render() {
        return (
            <React.Fragment>
                <div className={ style.box }>
                    { this.state.suggestions == null ? 
                    <div className={ style.loading }>
                        <FontAwesomeIcon spin={true} icon={faCircleNotch} />
                    </div> : 
                    <div>
                        <h3>Das könnte dich interessieren</h3>
                        { this.state.suggestions.map((user, index) => {
                            return (
                                <div key={ index } className={ style.user }>
                                    <img src={ user.profilePictureUrl } />
                                    <div className={ style.info }>
                                        <b>{ user.displayName }</b>
                                        <span>@{ user.username }</span>
                                    </div>
                                    <button onClick={ () => this.toggleFollow(index) }>{ user.isFollowing ? 'Folge ich' : 'Folgen' }</button>
                                </div>
                            )
                        }) }
                        { this.state.moreAvailable && 
                            <div className={ style.loadMoreHolder } onClick={ this.loadNextPage }>
                                <div className={ style.loadMore }>
									{this.state.loadMore && (
										<span>
										<FontAwesomeIcon spin={true} icon={faCircleNotch} />
										&nbsp;
										</span>
									)}
                                    Mehr anzeigen
                                    </div>
                            </div> 
                        }
                        { this.state.suggestions.length === 0 && 
                            <div className={ style.noSuggestions }>Keine Empfehlungen vorhanden</div> 
                        }
                    </div>
                    }
                </div>
			</React.Fragment>
	
		)
	}
}

export default Suggestions