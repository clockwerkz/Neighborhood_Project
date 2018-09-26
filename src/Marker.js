import { Component } from 'react';
import PropTypes from 'prop-types';


export class Marker extends Component {

    evtNames = ['click', 'mouseover'];

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    componentWillMount() {
        if (this.marker) this.marker.setMap(null);
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

        this.evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });
    
    }

    handleEvent(evt) {
        return (e) => {
            const evtName = `on${camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render() {
        return null;
    }
}

const camelize = function(str) {
    return str.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }


Marker.propTypes = {
    position: PropTypes.object,
    map: PropTypes.object
}

export default Marker;

