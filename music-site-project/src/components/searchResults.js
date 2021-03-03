import React from 'react';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar } from '@material-ui/core';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: []
        }
    }

    grabMusicData(event) {
        let url = "https://shazam.p.rapidapi.com/songs/get-details?key=" + event.target.id + "&locale=en-US";
        fetch(url, {
	    "method": "GET",
	    "headers": {
	    	"x-rapidapi-key": "2c9badedfcmsh9d42050de7390abp1d438bjsn0acd3e2002c6",
	    	"x-rapidapi-host": "shazam.p.rapidapi.com"
	    }
        })
        .then(response => {
        	console.log(response);
            return response.text();
        })
        .then(data => {
            let jsonObject = JSON.parse(data);
            console.log(jsonObject);
            this.props.setDetailsResult(jsonObject);
        })
        .catch(err => {
        	console.error(err);
        });
    }
    
    renderImageList = () => {

        let htmlBuffer = this.props.tracks.map((object) => {
            return(
                <GridListTile 
                    onClick={this.grabMusicData}
                    key={object.track.key}
                >
                    <img
                        src={object.track.images.coverarthq}
                        id={object.track.key}
                    />
                    <GridListTileBar
                        title={object.track.title}
                        subtitle={object.track.subtitle}
                    />
                </GridListTile>
                    );
        });

        return htmlBuffer;
    }

    render() {
        console.log("Rendering searchResults.js");
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

SearchResults.propTypes = {
    tracks: PropTypes.array,
    setDetailsResult: PropTypes.func,
}

export default SearchResults;