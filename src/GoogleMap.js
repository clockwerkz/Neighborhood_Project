import React, { Component } from 'react';


class GoogleMap extends Component {
    state = {
        mapIsReady : false
    }

    componentDidMount() {
        const ApiKey = 'INSERT KEY';
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&v=13`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', ()=> {
            this.setState({mapIsReady : true});
        })

        document.body.appendChild(script);
    }

    componentDidUpdate() {
        if (this.state.mapIsReady) {
            this.map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: 25.7617, lng: -80.1918},
                zoom: 12, 
            });
        }
    }


    render() {
        return (
            <div id="map"></div>
        )
    }
}

export default GoogleMap