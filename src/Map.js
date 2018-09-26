import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Map extends Component {
    style = {
        width: '100vw',
        height: '100vh'
      }

      state = {
          currentLocation: {
              lat : this.props.initialCenter.lat,
              lng : this.props.initialCenter.lng
          }
      }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            const zoom = this.props.zoom;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = {
                center: center,
                zoom: zoom
                }
            this.map = new maps.Map(node, mapConfig);
            let centerChangedTimeout;
            this.map.addListener('draggend', (evt) => {
                console.log('movevd');
                if (centerChangedTimeout){
                    clearTimeout(centerChangedTimeout);
                    centerChangedTimeout = null;
                }
                centerChangedTimeout = setTimeout(() =>{
                    this.props.onMove(this.map);
                });
            });
            this.forceUpdate();
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center);
        }
    }

    renderChildren() {
        const {children} = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter : this.state.currentLocation
            });
        })
    }

    render() {
        return (
            <div  style={this.style} ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        )
    }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter : PropTypes.object,
    onMove: PropTypes.func
}
Map.defaultProps = {
    zoom : 13,
    //Miami, Florida
    initialCenter: {
        lat : 25.7617,
        lng : -80.1918
    }
}

export default Map;