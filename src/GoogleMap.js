import React, { Component } from 'react';
import Map from './Map';
import ApiKey from './js/ApiKey';
import {GoogleApiWrapper} from 'google-maps-react';


class GoogleMap extends Component {
   
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Map google={this.props.google}
                />
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ApiKey
  })(GoogleMap)
