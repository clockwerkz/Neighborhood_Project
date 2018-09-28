import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import Venues from './data/Venues';
import VenueList from './VenueList'

class App extends Component {

  state = {
    searchString : '',
    selectedVenue : ''
  }

  changeSearchString = (searchString)=> {
    this.setState({ searchString })
  }

  changeSelectedVenue = (selectedVenue)=> {
    this.setState({ selectedVenue });
  }

  
  render() {
    return (
      <div className='container'>
        <VenueList 
          venueNames = {Venues.filter(venue=> venue.name.toLowerCase().includes(this.state.searchString.toLowerCase()))}
          changeSearchString = {this.changeSearchString}
          changeSelectedVenue = {this.changeSelectedVenue}
          selectedVenue = {this.state.selectedVenue}
        />

        <MapContainer
          changeSelectedVenue = {this.changeSelectedVenue}
          venues={Venues.filter(venue=> {
            if (venue.name.toLowerCase().includes(this.state.searchString.toLowerCase())) 
            {
              return venue;
            }
          })}
          selectedVenue={this.state.selectedVenue}
        />
      </div>    
    );
  }
}

export default App;

