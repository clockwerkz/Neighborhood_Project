import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ApiKey from './js/ApiKey';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker : {},
        selectedPlace : {}
    }

    onMarkerClick = (props, marker, e) => this.setState({
      selectedPlace : props,
      activeMarker : marker,
      showingInfoWindow : true  
    });

    onMapClicked = (props) => {
        if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {
        return (
            <Map google={this.props.google} 
                    initialCenter={{
                        lat : 25.7617,
                        lng : -80.1918 
                    }}
                    onClick={this.onMapClicked}
                    zoom={13}>
                {this.props.venues.map((venue, index) => {
                    return <Marker 
                    key={index}
                    onClick={this.onMarkerClick}
                    name={venue.name}
                    position={venue.position}
                    />
                })}
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : ApiKey
})(MapContainer);