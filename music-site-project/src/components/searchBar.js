import SearchBar from 'material-ui-search-bar';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../themes/css/app.css';

class MusicSearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userSearch: "",
        }
    }

    runSearch() {
        const searchTerm = encodeURIComponent(this.state.userSearch.trim())
        var url = "https://shazam.p.rapidapi.com/search?term=" + searchTerm + "&locale=en-US&offset=0&limit=5"
        fetch(url, {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-key": "2c9badedfcmsh9d42050de7390abp1d438bjsn0acd3e2002c6",
		        "x-rapidapi-host": "shazam.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            let jsonObject = JSON.parse(data);
            this.props.setQueryResult(jsonObject.tracks.hits);
        })
        .catch(err => {
        	console.error(err);
        });
    }

    render() {
        return(
            <div className={styles['searchBar']}>
                <SearchBar
                    value={this.state.userSearch}
                    onChange={(newSearch) => this.setState({ userSearch: newSearch })}
                    onRequestSearch={() => this.runSearch()}          
                />
            </div>
        );
    }
}

MusicSearchBar.propTypes = {
    setQueryResult: PropTypes.func,
}

export default MusicSearchBar;