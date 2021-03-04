import React from 'react';
import PropTypes from 'prop-types';
import { 
    Grid,
    Typography,
    Hidden } from '@material-ui/core';
import ReactPlayer from 'react-player';
import styles from '../themes/css/app.css';

class MusicDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: null,
        }
    }

    findValue(value) {
        let valIndex = null;
        if (this.props.songDetails) {
            valIndex = this.props.songDetails.sections.findIndex(obj => obj.type === value);
        }

        return valIndex;
    }

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

MusicDetails.propTypes = {
    songDetails: PropTypes.object,
}

export default MusicDetails;