import './App.css';
import projectTheme from './themes/musicSiteProjectTheme';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { 
    CssBaseline, 
    ThemeProvider,
    Grid,
    Accordion, 
    Typography} from '@material-ui/core';
import MusicSearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import MusicDetails from './components/musicDetails';
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            songID: null,
            songDetails: null,
        }
    }

    setQueryResult = (tracks) => {
        this.setState({
            tracks: tracks,
            songID: null,
            songDetails:null,
        });
    }

    setSongDetails = (results) => {
        this.setState({
            songDetails: results,
        });
    }

    renderSearchBar = () => {
        return(
            <Grid item sm={12}>
                <MusicSearchBar 
                    setQueryResult={this.setQueryResult}
                />
            </Grid>
        );
    }

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
