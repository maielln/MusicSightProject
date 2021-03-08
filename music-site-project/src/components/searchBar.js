import SearchBar from 'material-ui-search-bar';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../themes/css/main.css';
import { Alert } from '@material-ui/lab';

/**
 * Class to hold the search bar and its REST API call
 * 
* @author - Nicole Maiello
 */
class MusicSearchBar extends React.Component {

    /**
     * Constructs the class
     * 
     * @param {*} props - see below for prop descriptions
     * 
     * @state {string} userSearch - holds the user's pressed keys (what's showing in search bar)
     * @state {bool} validInput - bool to hold if the users input is valid
     * @state {string} infoMsg - holds message that informs user of any issues/no results detected
     */
    constructor(props) {
        super(props);

        this.state = {
            userSearch: "",
            validInput: true,
            infoMsg: "Search for a singer/song.",
        }
    }

    /**
     * Test user input to verify if the input is valid 
     * and contains at least one character (can be letter, number, or select special characters)
     * 
     * @returns boolean
     */
    performValidation() {
        const regExp = new RegExp(/[a-zA-Z0-9~`!#$\^@*()+=\-_\[\]\\';,?/{}[]|\\":<>\?]/g);

        return (regExp.test(this.state.userSearch) && !this.state.userSearch.includes('%'));
    }

    /**
     * Method to perform REST API call to pull top 5 results (songs) related to user's query
     */
    runSearch() {
        // Validate user input (check if not empty and if search is a string value)
        if(this.performValidation()) {
            const searchTerm = encodeURIComponent(this.state.userSearch.trim());
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
                
                // Check that data was received
                if(Object.keys(jsonObject).length !== 0) {
                    this.props.setQueryResult(jsonObject.tracks.hits);
                }
                else {
                    this.props.setQueryResult([]);
                    this.setState({
                        infoMsg: "No data recieved for query, please try again."
                    });
                }
            })
            .catch(err => {
                console.log(err);
            	this.setState({
                    infoMsg: "Issue with query, error: " + err,
                })
            });

            if(!this.state.validInput) {
                this.setState({
                    validInput: true,
                });
            }
        }
        else{
            this.props.setQueryResult([]);
            this.setState({
                validInput: false,
            });
        }
    }
    
    /**
    * Render the info alert to inform the user of what to do/any issues that may have occurred during runtime
     * 
     * @returns html
     */
    renderInfo() {
        return(
            <div>
                <Alert severity="info">{this.state.infoMsg}</Alert>
                <br />
            </div>
        )
    }

    /**
     * Render an alert error if the user enters invalid input
     * 
     * @returns html
     */
    renderError() {
        if(!this.state.validInput) {
            return(
                <div>
                    <Alert severity="error">Invalid input detected, please do not use '%, :, or &' and provide a search term.</Alert>
                    <br />
                </div>
            );
        }
    }

    /**
     * Render the search bar and assign user interaction endpoints
     * 
     * @returns html
     */
    render() {
        return(
            <div>
                {this.renderInfo()}
                {this.renderError()}
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