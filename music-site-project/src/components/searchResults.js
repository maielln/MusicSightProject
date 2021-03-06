import React from 'react';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    Tooltip } from '@material-ui/core';

/**
 * Class to hold the results from the REST API call (pulls data for selected song) 
 * Formats the search results from the call.
 */
class SearchResults extends React.Component {

    /**
     * Construct the class
     * 
     * @param {*} props - see below for prop descriptions
     * 
     * @state {array} tracks - holds the results of the initial search
     */
    constructor(props) {
        super(props);

        this.state = {
            tracks: []
        }
    }

    /**
     * Method to perform the REST API call - pulls data related to the user's selection from the
     * 1-5 given songs
     * 
     * @param {*} event - User click on the song search results
     */
    grabMusicData = (event) => {
        let url = "https://shazam.p.rapidapi.com/songs/get-details?key=" + event.target.id + "&locale=en-US";
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
            this.props.setSongDetails(jsonObject);
        })
        .catch(err => {
        	console.error(err);
        });
    }

    /**
     * Method to render the search results from search bar
     * 
     * @returns html
     */
    renderImageList = () => {
        let htmlBuffer = this.props.tracks.map((object) => {
            return(
                <Tooltip title={"Click for more details."}>
                    <GridListTile 
                        onClick={this.grabMusicData}
                        key={object.track.key}
                    >
                        <img
                            src={object.track.images ? object.track.images.coverarthq : "https://snworksceo.imgix.net/dtc/3f037af6-87ce-4a37-bb37-55b48029727d.sized-1000x1000.jpg?w=1000"}
                            id={object.track.key}
                        />
                        <GridListTileBar
                            title={object.track.title}
                            subtitle={object.track.subtitle}
                        />
                    </GridListTile>
                </Tooltip>
                    );
        });

        return htmlBuffer;
    }

    /**
     * Method to render the search results from search bar query
     * 
     * @returns html
     */
    render() {
        return(
            <GridList
                cellHeight={500}
                cols={5}
                spacing={20}
            >
                {this.renderImageList()}
            </GridList>

        );
    }
}

/**
 * @param {array} tracks - holds the results of the initial search
 * @param {function} setSongDetails - function to fill in the data for songDetails result
 */
SearchResults.propTypes = {
    tracks: PropTypes.array,
    setSongDetails: PropTypes.func,
}

export default SearchResults;