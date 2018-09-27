import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import Venues from './data/Venues';

class App extends Component {

  state = {
    searchString : '',
    selectedVenue : ''
  }

  
  render() {
    return (
      <div className='container'>
        <MapContainer
          venues={Venues.filter(venue=> venue.name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
          selectedVenue={this.state.selectedVenue}
        />
      </div>    
    );
  }
}

export default App;

