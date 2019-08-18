import React from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker,} from 'google-maps-react';

export const GOOGLE_API_KEY = 'AIzaSyBQLmcCYTcJDIaVGDLUJ9hUiSsRcW2VyYk';

export class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>{
  window.navigator.vibrate(30);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const locations = this.props.locations;
   return (
     <Map google={this.props.google}
          style={{width: '97%', height: '95%', position: 'relative'}}
          onClick={this.onMapClicked}
          zoom={12} initialCenter={{
            lat: 32.109333,
            lng: 34.855499}}>

            {locations.length < 1 ? null : locations.map(location => {
              let coordinates = location.coordinates.split(', ');
              return (
                <Marker
                    onClick={this.onMarkerClick}
                    key={`${location.name}.mrk`}
                    name={location.name}
                    category={location.category}
                    address={location.address}
                    position={{lat:coordinates[0] ,lng:coordinates[1]}}
                    />
            )})
          }

            <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>{`Cat.: ${this.state.selectedPlace.category}`}</h3>
              <h3>{this.state.selectedPlace.address}</h3>
            </div>
        </InfoWindow>
     </Map>
   );
 }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)


// <InfoWindow onClose={this.onInfoWindowClose}>
//     <div>
//       <h1>{this.state.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>
// <Marker onClick={this.onMarkerClick}
        // name={'Current location'} />
