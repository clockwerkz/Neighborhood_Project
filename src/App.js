import React, { Component } from 'react';
import './App.css';
import GoogleMap from './GoogleMap';

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
      <div className="App">
        <GoogleMap locations = {this.state.locations.filter(locale => {
          if (locale.name.toLowerCase().includes(this.state.searchString)) {
            console.log(locale.position);
            return locale.position
          }
        })}/>
      </div>
    );
  }
}

export default App;

