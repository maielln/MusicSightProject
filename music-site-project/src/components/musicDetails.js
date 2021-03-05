import React from 'react';
import PropTypes from 'prop-types';
import { 
    Grid,
    Typography,
    Hidden } from '@material-ui/core';
import ReactPlayer from 'react-player';

/**
 * Class to hold the formatting of results of user query on selected song
 */
class MusicDetails extends React.Component {

    /**
     * Construct the class
     * 
     * @param {*} props - see below for prop descriptions
     * 
     * @state {string} url - string of music video if incoming data contains the URL
     */
    constructor(props) {
        super(props);

        this.state = {
            url: null,
        }
    }

    /**
     * Method to find the index of different types inside songDetails.sections
     * 
     * @param {String} value - item type to search for (i.e: "SONG", "ARTIST", etc)
     * 
     * @returns html
     */
    findValue(value) {
        let valIndex = null;
        if (this.props.songDetails) {
            valIndex = this.props.songDetails.sections.findIndex(obj => obj.type === value);
        }

        return valIndex;
    }

    /**
     * Method to render and build the html containing lyrics from query
     * 
     * @returns html
     */
    renderLyrics = () => {
        try {
            if(this.props.songDetails) {
                let lyrics = this.props.songDetails.sections[this.findValue("LYRICS")].text;
                let htmlBuffer = lyrics.map((lyric) => {
                    return (
                        <Typography>
                            {lyric}
                            <br />
                        </Typography>
                    );
                });
                return htmlBuffer;
            }
        }
        catch (err) {
            console.log("Error loading lyrics: " + err);
        }
    }

    /**
     * Method to render the metadata associated with the selected song
     * 
     * @param {number} songIndex - Index to find the SONG data
     * 
     * @returns html
     */
    renderMetadata = (songIndex) => {
        try {
            if(this.props.songDetails) {
                let metadata = this.props.songDetails.sections[songIndex].metadata;
                let htmlBuffer = metadata.map((metadata) => {
                    return (
                        <Grid item>
                            <Typography> 
                                {metadata.title + ": " + metadata.text}
                            </Typography>
                        </Grid>
                    );
                });
                return htmlBuffer;
            }
        }
        catch (err) {
            console.log("Error loading metadata: " + err);
        }
    }

    /**
     * Method to render the Youtube video if url to video is provided
     * 
     * @param {number} videoIndex - Index to find the url data from VIDEO section
     * 
     * @returns html
     */
    renderYoutubeVideo = (videoIndex) => {
        if(this.props.songDetails && videoIndex > -1) {
            if(this.props.songDetails.sections[videoIndex].youtubeurl.actions[0].uri) {
                return (
                    <Grid item>
                        <ReactPlayer url={(this.props.songDetails && videoIndex > -1) ? this.props.songDetails.sections[videoIndex].youtubeurl.actions[0].uri : null} />
                    </Grid>
                );
            }
        }
    }

    /**
     * Method to render the artist image associated with the selected song
     * 
     * @param {number} artistIndex - Index to find the url data from ARTIST section
     * 
     * @returns html
     */
    renderArtistImage = (artistIndex) => {
        if(this.props.songDetails && artistIndex > -1) {
            if(this.props.songDetails.sections[artistIndex].avatar) {
                return(
                    <Grid item>
                        <img src={(this.props.songDetails && artistIndex > -1) ? this.props.songDetails.sections[artistIndex].avatar : null} />
                    </Grid>
                );
            }
        }
    }

    /**
     * Method to render the music details section of the UI
     * 
     * @returns html
     */
    render() {
        console.log(this.props.songDetails);
        const videoIndex = this.findValue("VIDEO");
        const artistIndex = this.findValue("ARTIST");
        const songIndex = this.findValue("SONG");
        return(
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item>
                        <Typography variant="h4">{"Artist and Album Information:"}</Typography>
                </Grid>
                <Grid item>
                    <Grid
                       container
                       direction="row"
                       justify="center"
                       spacing={8}
                    >
                        <Grid
                        alignContent="center"
                        justify="center"
                        direction="row"
                        spacing={20}
                        >
                            {this.renderYoutubeVideo(videoIndex)}
                            {this.renderArtistImage(artistIndex)}
                            {this.renderMetadata(songIndex)}
                        </Grid>
                        <Grid item>
                            <Typography> 
                                {this.renderLyrics()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

/**
 * @param {object} songDetails - details from the REST API call for grabbing details of selected song
 */
MusicDetails.propTypes = {
    songDetails: PropTypes.object,
}

export default MusicDetails;