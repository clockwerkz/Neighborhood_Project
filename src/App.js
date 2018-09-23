import React, { Component } from 'react';
import './App.css';
import ApiKey from './js/ApiKey';
import GoogleMap from './GoogleMap';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <GoogleMap />
      </div>
    );
  }
}

export default App;

