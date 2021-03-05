import './themes/css/App.css';
import projectTheme from './themes/musicSiteProjectTheme';
import { 
    CssBaseline, 
    ThemeProvider,
    Grid,
    Typography} from '@material-ui/core';
import MusicSearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import MusicDetails from './components/musicDetails';
import React from 'react';

/**
 * Class to act as a container for the individual
 * components of the UI
 */
class App extends React.Component {

    /**
     * Construct the class
     *
     * @param {*} props 
     * 
     * @state {array} tracks - holds the results of the initial search
     * @state {number} songID - holds the ID of the selected song
     * @state {object} songDetails - holds the details of the song query
     */
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            songID: null,
            songDetails: null,
        }
    }

    /**
     * Method to set the tracks in this.state after performing the 
     * search REST API call
     * 
     * @param {array} tracks - new songlist search results
     */
    setQueryResult = (tracks) => {
        this.setState({
            tracks: tracks,
            songID: null,
            songDetails:null,
        });
    }

    /**
     * Method to set the songDetails in this.state after selecting
     * a song to obtain details for from REST API call
     * 
     * @param {object} results - result from the song selection query
     */
    setSongDetails = (results) => {
        this.setState({
            songDetails: results,
        });
    }

    /**
     * Method to render the search bar
     * 
     * @returns html for searchbar
     */
    renderSearchBar = () => {
        return(
            <Grid item sm={12}>
                <MusicSearchBar 
                    setQueryResult={this.setQueryResult}
                />
            </Grid>
        );
    }

    /**
     * Method to render the search results from search query
     * 
     * @returns html to display search results
     */
    renderSearchResults = () => {
        if(this.state.tracks !== []) {
            return(
                <Grid item sm={10}>
                    <SearchResults 
                        tracks={this.state.tracks}
                        setSongDetails={this.setSongDetails}
                    />
                </Grid>
            );
        }
    }

    /**
     * Method to render the details of the selected song/search result
     * 
     * @returns html to display selected song details
     */
    renderMusicDetails = () => {
        if(this.state.songDetails) {
            return(
                <Grid item sm={12}>
                    <MusicDetails 
                        songDetails={this.state.songDetails}
                    />
                </Grid>
            );
        }
    }

    /**
     * Method to render the application 
     * 
     * @returns html of application
     */
    render() {
        return (
          <ThemeProvider theme={projectTheme}>
            <CssBaseline />
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant='h4'>{"SWENG 861 Course Project: Option 1"} </Typography>
                </Grid>
                {this.renderSearchBar()}
                {this.renderSearchResults()}
                {this.renderMusicDetails()}
            </Grid>
          </ThemeProvider>
        );
    }
}

export default App;
