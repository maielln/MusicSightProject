import SearchBar from 'material-ui-search-bar';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../themes/css/main.css';

/**
 * Class to hold the search bar and its REST API call
 */
class MusicSearchBar extends React.Component {

    /**
     * Constructs the class
     * 
     * @param {*} props 
     * 
     * @state {string} userSearch - holds the user's pressed keys (what's showing in search bar)
     */
    constructor(props) {
        super(props);

        this.state = {
            userSearch: "",
        }
    }

    /**
     * Method to perform REST API call to pull top 5 results (songs) related to user's query
     */
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

    /**
     * Render the search bar and assign user interaction endpoints
     * 
     * @returns html
     */
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

/**
 * @param {function} setQueryResult - function to fill in the tracks with result from user searh
 */
MusicSearchBar.propTypes = {
    setQueryResult: PropTypes.func,
}

export default MusicSearchBar;