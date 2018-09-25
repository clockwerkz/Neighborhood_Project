import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Marker extends Component {

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    renderMarker() {
        let { map, google, position, mapCenter } =this.props
        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);
        
        const pref = {
            map,
            position
        }
        this.marker = new google.maps.Marker(pref);
    
    }

    render() {
        return null;
    }
}


Marker.propTypes = {
    position: PropTypes.object,
    map: PropTypes.object
}

export default Marker;

