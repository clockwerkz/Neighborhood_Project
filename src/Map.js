import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
    style = {
        width: '100vw',
        height: '100vh'
      }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let zoom = 14;
            let lat = 25.7617;
            let lng = -80.1918;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = {
                center: center,
                zoom: zoom
                }
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        return (
            <div  style={this.style} ref='map'>
                Loading map...
            </div>
        )
    }
}

export default Map;