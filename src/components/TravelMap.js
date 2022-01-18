import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import "./TravelMap.css"

function TravelMap(props) {

  const centerOnUS = [37.61, -96.322];
  // time is in months
  const locationList = {
    0: {
      "city": "Fairfax County",
      "state": "VA",
      // "stay": "apartment",
      "time": "12",
      "coordinates": [38.85, -77.342]
    },
    1: {
      "city": "Washington",
      "state": "DC",
      // "stay": "apartment",
      "time": "3",
      "coordinates": [38.90, -77.02]
    },
    2: {
      "city": "Cincinnati",
      "state": "OH",
      "time": "0",
      // "stay": "transit",
      "coordinates": [39.12, -84.51]
    },
    3: {
      "city": "Kansas City",
      "state": "MO",
      "time": "0",
      "coordinates": [39.121, -94.58]
    },
    4: {
      "city": "Denver",
      "state": "CO",
      "time": "3",
      "coordinates": [39.913, -104.95]
    }
  }

  let markerList = [];
  let polyline = [];
  for (let i = 0; i < Object.keys(locationList).length; i++) {
    let currentMarker = <Marker key={`location-marker-${i}`} position={locationList[i]["coordinates"]}>
      {/*<Popup>{locationList[i]["city"]}, {locationList[i]["state"]} <br /> Location {i} </Popup>*/}
      <Tooltip>{locationList[i]["city"]}, {locationList[i]["state"]} <br /> Location {i} </Tooltip>
    </Marker>;
    polyline.push(locationList[i]["coordinates"])
    markerList.push(currentMarker);
  }

  return (
    <div id="map-border">
      <div id="map-container">
      <MapContainer center={centerOnUS} zoom={4} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerList}
        <Polyline pathOptions={{ color: 'grey' }} positions={polyline} />
      </MapContainer>
      </div>
    </div>
  );
}

export default TravelMap;