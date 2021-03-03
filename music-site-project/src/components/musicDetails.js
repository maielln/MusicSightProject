import React from 'react';
import PropTypes from 'prop-types';
import { 
    Grid,
    Typography } from '@material-ui/core';
import ReactPlayer from "react-player"

class MusicDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: null,
        }
    }

    // componentDidUpdate(prevState, prevProps) {
    //     if(JSON.stringify(prevProps.songDetails) !== JSON.stringify(this.props.songDetails)) {
    //         if(this.props.songDetails) {
    //             let tempUrlIndex = this.props.songDetails.sections.findIndex(obj => obj.type === "VIDEO");
                
    //             if(prevState.url !== this.props.songDetails.sections[tempUrlIndex].youtubeurl.actions[0].uri) {
    //                 this.setState({
    //                     url: this.props.songDetails.sections[tempUrlIndex].youtubeurl.actions[0].uri
    //                 });
    //             }
    //         }
    //     }
    // 

    render() {
        console.log(this.props.songDetails);
        return(
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={10}
            >
                <Grid item>
                    <ReactPlayer url={(this.props.songDetails) ? this.props.songDetails.sections[this.props.songDetails.sections.findIndex(obj => obj.type === "VIDEO")].youtubeurl.actions[0].uri : null} />
                </Grid>
                <Grid item>
                    <Typography> 
                        {(this.props.songDetails) ? this.props.songDetails.sections[this.props.songDetails.sections.findIndex(obj => obj.type === "LYRICS")].text : "" }
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

MusicDetails.propTypes = {
    songDetails: PropTypes.object,
}

export default MusicDetails;