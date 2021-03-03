import './App.css';
import projectTheme from './themes/musicSiteProjectTheme';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { 
    CssBaseline, 
    ThemeProvider,
    Grid } from '@material-ui/core';
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
        });
    }

    setSongDetails = (results) => {
        this.setState({
            songDetails: results,
        });
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
                spacing={10}
            >
                <Grid item xs={8}>
                    <MusicSearchBar 
                        setQueryResult={this.setQueryResult}
                    />
                </Grid>
                <Grid item sm={10}>
                    <SearchResults 
                        tracks={this.state.tracks}
                        setSongDetails={this.setSongDetails}
                    />
                </Grid>
                <Grid item sm={12}>
                    <MusicDetails 
                        songDetails={this.state.songDetails}
                    />
                </Grid>
                {/* <Grid item>
                    <MoreHorizIcon className={styles['icons']} />
                </Grid> */}
            </Grid>
          </ThemeProvider>
        );
    }
}

export default App;
