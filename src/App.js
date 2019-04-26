import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import logo from './friedhead.svg';
import './App.css';


const mapStyles = {

  margin: '30px',
  display: 'flex',
  alignItems: 'center'
};


export class App extends Component {

  state = {
    address: '',
    windowActive: true,
    
    location: {
      lat: -1.2884,
      lng: 36.8233
   }
  };


 getLocation = async () => {

//We get a random at and long
    const location = {}
    location.lat = ((Math.random()*90+1) - (Math.random()*90+1)) 
    location.lng = ((Math.random()*90+1) - (Math.random()*90+1))

//We create an empty var, and then use an api call to fetch the address
    let newAddress = ''
    const api_call = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key='Insert_api_key'`)
    const response = await api_call.json();
    console.log(response)

//We check to make sure there isnt in the ocean, or unmapped territory
    if (response.status == 'ZERO_RESULTS' ) {
        this.getLocation()
    } else {
      newAddress = response.results[0].formatted_address
      this.setState({ location: location, address: newAddress })
    }
};



render() {

// ------  THE RETURN BLOCK  ------ //

return (
  <div className="App">


{/* HEADER */}

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>30 days of React</h1>
          <h2>Day Fifteen / Let's go on HOLIDAY </h2>
        </header>

{/* COMPONENTS */}
    
      <button
        className="mainbtn" 
        onClick={this.getLocation}>CLICK ME 🌴
      </button>


    <div>

{/* Library component from google-maps-react */}
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={this.state.location}
        center={this.state.location}
      >

{/* Library component from google-maps-react */}       
       <InfoWindow
          visible={this.state.windowActive}
          position={this.state.location}
          >
            <div>
              <h3>You're going to {this.state.address} 🌴</h3>
            </div>
        </InfoWindow>

    </Map>
    
    </div>
        
   </div>
  );
 }
}

export default GoogleApiWrapper({
  apiKey: 'Insert_api_key'
})(App);

