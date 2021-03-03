import React from 'react';
import PropTypes from 'prop-types';

class MusicDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            </div>
        );
    }
}

MusicDetails.propTypes = {
    songDetails: PropTypes.object,
}

export default MusicDetails;