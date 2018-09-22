import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  componentDidMount() {
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap');
  }

  initMap() {
    map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map));
  }
  
  render() {
    return (
      <div className="App">
        <div ref="map" style={{height: '100vh', width: '100%', background: '#444'}}></div>
      </div>
    );
  }
}

function loadJS(src) {
  let ref = window.document
}

export default App;

