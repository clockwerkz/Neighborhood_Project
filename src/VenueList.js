import React, { Component } from 'react';

class VenueList extends Component {

    state = {
        displayMenu : false,
        selectedVenue : '',
        fetchError : false,
        selectedPlace : ''
    }

    displayVenueData = (selectedVenue) => {
        console.log(selectedVenue);
        this.setState({
            selectedPlace : selectedVenue
        });
    }

    grabVenueData = (venue='Versailles') => {
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=NV0BJPN1WVI0ZR3D31GNBQNNIASD0ZZ3L42TIST2NAP0WPJ3
&client_secret=WHNEFU1Z01MST0YBQIHPJGAY1TABNV42JIQRPZE4JFTQVTOQ&v=20180323&query=${venue}&limit=1&near=Miami,Fl`)
    .then(res => res.json())
    .then(data => this.displayVenueData(data.response.venues[0]))
    .catch(err => this.setState({ fetchError : true }));
    }


    updateVenue = (selectedVenue) => {
        this.setState({ selectedVenue });
        this.props.changeSelectedVenue(selectedVenue);
        this.grabVenueData(selectedVenue);
    }

    displayVenueList = () => {
        this.setState(prevState => {return {
            displayMenu : !prevState.displayMenu
        }});
    }

    render() {
        return (
            <div>
                <button 
                    className={(this.state.displayMenu ? 'open-list closed':'open-list')}
                    onClick={this.displayVenueList}
                tabIndex={0}
                >{(this.state.displayMenu ? 'Close' : 'Open')}</button>
                <div className={(this.state.displayMenu ? 'venue-list show':'venue-list')}>
                    <input type="text" placeholder="Search" 
                    onChange={(e)=> {
                        this.props.changeSearchString(e.target.value)
                        }}
                    onFocus={() =>this.props.changeSelectedVenue(null) }
                        />
                    <ul>
                        {this.props.venueNames.map((venue, index)=> <li 
                            onClick={(e)=>this.updateVenue(e.target.textContent)} 
                            onFocus={(e)=>this.updateVenue(e.target.textContent)} 
                            onBlur={(e)=>this.updateVenue(null)} 
                            key={index} 
                            className={(this.props.selectedVenue === venue.name ? 'selected-venue' : '')} 
                            tabIndex={0}
                            >{venue.name}
                            {this.state.selectedVenue === venue.name ? this.state.fetchError ? (<p style={{fontSize: '.8rem', textAlign : 'center'}}>Error has occured fetching data</p>) : (
                                <div className='venue-list-select'>
                                    <p>{this.state.selectedPlace && this.state.selectedPlace.location.address}</p>
                                    <p>
                                        <span>{this.state.selectedPlace && this.state.selectedPlace.location.city+', '}</span>
                                        <span>{this.state.selectedPlace && this.state.selectedPlace.location.state+' '}</span>
                                        <span>{this.state.selectedPlace && this.state.selectedPlace.location.postalCode}</span>
                                    </p>  
                                </div>
                                ):('')}
                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default VenueList;