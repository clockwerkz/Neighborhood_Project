import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';

class App extends Component {

  state = {
    locations : [
      {name : 'Versailles', position : { lat : 25.765362, lng : -80.252756 }},
      {name : 'Casa Juancho', position : { lat : 25.765126, lng : -80.235782 }}
    ],
    searchString : ''
  }

  
  render() {
    return (
      <div>
        <MapContainer 
          venues={this.state.locations}
        />
      </div>    
    );
  }
}

export default App;

