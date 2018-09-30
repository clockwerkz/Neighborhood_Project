import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ApiKey from './js/ApiKey';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker : {},
        selectedPlace : {
            name : '',
            location: ''
        },
    }

    displayVenueData = (selectedVenue, marker) => {
        console.log(selectedVenue);
        this.setState({
            showingInfoWindow : true,
            activeMarker : marker,
            selectedPlace : selectedVenue
        });
    }

    grabVenueData = (venue='Versailles', marker) => {
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=NV0BJPN1WVI0ZR3D31GNBQNNIASD0ZZ3L42TIST2NAP0WPJ3
&client_secret=WHNEFU1Z01MST0YBQIHPJGAY1TABNV42JIQRPZE4JFTQVTOQ&v=20180323&query=${venue}&limit=5&near=Miami,Fl`)
    .then(res => res.json())
    .then(data => this.displayVenueData(data.response.venues[0], marker));
    }

    onMarkerClick = (props, marker, e) => {
        this.grabVenueData(marker.name, marker);
        
    } 

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
            <div className="map-container">
                <Map google={this.props.google} 
                        initialCenter={{
                            lat : 25.75,
                            lng : -80.28 
                        }}
                        onClick={this.onMapClicked}
                        zoom={12}>
                    {this.props.venues.map((venue, index) => {
                        return <Marker 
                        key={index+1}
                        onClick={this.onMarkerClick}
                        name={venue.name}
                        position={venue.position}
                        animation={(this.props.selectedVenue && this.props.selectedVenue === venue.name ? 1 : 0)}
                        />
                    })}
                    <InfoWindow 
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace && this.state.selectedPlace.name}</h1>
                            <p>{this.state.selectedPlace && this.state.selectedPlace.location.address}</p>
                            <p>
                                <span>{this.state.selectedPlace && this.state.selectedPlace.location.city+', '}</span>
                                <span>{this.state.selectedPlace && this.state.selectedPlace.location.state+' '}</span>
                                <span>{this.state.selectedPlace && this.state.selectedPlace.location.postalCode}</span>
                            </p>
                            
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : 'AIzaSyDyL3ZzAfSL26s8ovijKF-5DvVxXSdYJQI'
})(MapContainer);