import React, { Component } from 'react';
import Map from './Map';
import ApiKey from './js/ApiKey';
import Marker from './Marker';
import {GoogleApiWrapper} from 'google-maps-react';
import InfoWindow from './InfoWindow';


class GoogleMap extends Component {

    state = {
        showingInfoWindow : false,
        activeMarker : {},
        selectedPlace : {}
    }

    onMapClick() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    onInfoWindowClose() {
        console.log('clicked');
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
   
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Map google={this.props.google}
                     onClick={this.onMapClick}
                >
                    {this.props.venues && this.props.venues.map((venue, index) => <Marker 
                        key={index}                                         position={venue.position}
                        name={venue.name}
                        onClick={this.onMarkerClick.bind(this)}
                        ></Marker>)}
                <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose.bind(this)}
                >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                </InfoWindow>
                </Map>
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ApiKey
  })(GoogleMap)
