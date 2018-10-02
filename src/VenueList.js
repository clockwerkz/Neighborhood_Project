import React, { Component } from 'react';

class VenueList extends Component {

    state = {
        displayMenu : false,
        selectedVenue : ''
    }



    updateVenue = (selectedVenue) => {
        this.setState({ selectedVenue });
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
                            onClick={(e)=>{
                                this.updateVenue(e.target.textContent);
                                this.props.changeSelectedVenue(e.target.textContent);
                                }} 
                            onFocus={(e)=>this.props.changeSelectedVenue(e.target.textContent)}
                            onBlur={(e)=>this.props.changeSelectedVenue(null)}
                            key={index} 
                            className={(this.props.selectedVenue === venue.name ? 'selected-venue' : '')} 
                            tabIndex={0}
                            >{venue.name}
                            {this.state.selectedVenue === venue.name ? (<p>Selected Venue</p>):('')}
                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default VenueList;