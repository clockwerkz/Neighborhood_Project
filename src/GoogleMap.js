import React, { Component } from 'react';
import Map from './Map';
import ApiKey from './js/ApiKey';
import Marker from './Marker';
import {GoogleApiWrapper} from 'google-maps-react';


class GoogleMap extends Component {
   
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        let markerPos = (this.props.locations ? this.props.locations.map(locale => locale.position) : [] );
        return (
            <div>
                <Map google={this.props.google}>
                    {markerPos.map((marker, index) => <Marker key={index} position={marker}></Marker>)}
                </Map>
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ApiKey
  })(GoogleMap)
