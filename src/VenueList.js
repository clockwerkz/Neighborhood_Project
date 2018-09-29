import React from 'react';

const VenueList = (props) => {
    return (
        <div className='venue-list'>
            <input type="text" placeholder="Search" 
            onChange={(e)=> {
                props.changeSearchString(e.target.value)
                }}
            onFocus={() =>props.changeSelectedVenue(null) }
                />
            <ul>
                {props.venueNames.map((venue, index)=> <li 
                    onClick={(e)=>props.changeSelectedVenue(e.target.textContent)} 
                    onFocus={(e)=>props.changeSelectedVenue(e.target.textContent)}
                    onBlur={(e)=>props.changeSelectedVenue(null)}
                    key={index} 
                    className={(props.selectedVenue === venue.name ? 'selected-venue' : '')} 
                    tabIndex={0}
                    >{venue.name}</li>)}
            </ul>
        </div>
    )
}

export default VenueList;