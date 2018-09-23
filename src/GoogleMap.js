import React, { Component } from 'react';
import Map from './Map';
import ApiKey from './js/ApiKey';
import {GoogleApiWrapper} from 'google-maps-react';


class GoogleMap extends Component {
   
    style = {
        width: '100vw',
        height: '100vh'
      }
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div style={this.style}>
                <Map google={this.props.google}
                />
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: ApiKey
  })(GoogleMap)
