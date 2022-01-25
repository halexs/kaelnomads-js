import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMapEvent } from 'react-leaflet';
import "./TravelMap.css";
import TravelMapLegend from "./TravelMapLegend";

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}

function TravelMap(props) {

  const centerOnUS = [37.61, -96.322];
  // time is in months
  const locationList = {
    0: {
      "city": "Fairfax County",
      "state": "VA",
      // "stay": "apartment",
      "time": "12",
      "timeUnit": "M",
      "coordinates": [38.85, -77.342]
    },
    1: {
      "city": "Washington",
      "state": "DC",
      // "stay": "apartment",
      "time": "3",
      "timeUnit": "M",
      "coordinates": [38.90, -77.02]
    },
    2: {
      "city": "Cincinnati",
      "state": "OH",
      "time": "2",
      "timeUnit": "D",
      // "stay": "transit",
      "coordinates": [39.12, -84.51]
    },
    3: {
      "city": "Kansas City",
      "state": "MO",
      "time": "1",
      "timeUnit": "D",
      "coordinates": [39.121, -94.58]
    },
    4: {
      "city": "Denver",
      "state": "CO",
      "time": "3",
      "timeUnit": "M",
      "coordinates": [39.913, -104.95]
    }
  }
  // Change polylines to be color coded. From Blue being longest away, to Orange being a recent stop.
  // Maybe in the future make it based on length of time, but for now just do it by number of stops.

  // Start: #499ac9 (blue)
  // End: #d18238 (orange)

  // Finish colorPicker some other time
  const colorPicker = (currentIndex, totalLocations) => {
    const startRGB = "#499ac9";
    const endRGB = "#d18238";

    const startR = startRGB.slice(1,3);
    const startG = startRGB.slice(3,5);
    const startB = startRGB.slice(5);
    // console.log("start RGB: ", startR, startG, startB);

    const endR = endRGB.slice(1,3);
    const endG = endRGB.slice(3,5);
    const endB = endRGB.slice(5);
    // console.log("end RGB: ", endR, endG, endB);

    const calculateColor = (start, end, currentIndex, totalLocations) => {
      const startColor = parseInt(start, 16);
      const endColor = parseInt(end, 16);
      let finalColor = "00";
      // let 

      if (currentIndex === 0) {
        finalColor = start;
      }
      else if (currentIndex === (totalLocations - 1)) {
        finalColor = end;
      }
      else {
        // console.log("start color: ", startColor);
        // console.log("end color: ", endColor);
        let finalCalc = Math.floor((startColor + endColor) * currentIndex / totalLocations);
        // console.log("current color int: ", finalCalc);
        finalColor = finalCalc.toString(16);
        // let hexCalc = finalCalc.toString(16);
      }
      return finalColor;
    }

    const currentR = calculateColor(startR, endR, currentIndex, totalLocations);
    const currentG = calculateColor(startG, endG, currentIndex, totalLocations);
    const currentB = calculateColor(startB, endB, currentIndex, totalLocations);

    const currentColor = `${currentR}${currentG}${currentB}`
    console.log("current color for i out of total: ", currentIndex, " ", totalLocations, " ", currentColor);
    return currentColor;
    // return "hello";
  }

  let markerList = [];
  let polyline = [];
  for (let i = 0; i < Object.keys(locationList).length; i++) {
    let currentMarker = <Marker key={`location-marker-${i}`} position={locationList[i]["coordinates"]}>
      {/*<Popup>{locationList[i]["city"]}, {locationList[i]["state"]} <br /> Location {i} </Popup>*/}
      <Tooltip>{locationList[i]["city"]}, {locationList[i]["state"]} <br /> Location {i} </Tooltip>
    </Marker>;
    // console.log("current index: ", i);
    // console.log("max index : ", i);
    if (i < (Object.keys(locationList).length - 1)) {
      let currentColor = "#" + colorPicker(i, Object.keys(locationList).length);
      console.log("current color: ", currentColor);
      let newColors = {"color": currentColor};
      let currentLine = <Polyline key={`route-${i}-${i+1}`} pathOptions={newColors} positions={[locationList[i]["coordinates"], locationList[i + 1]["coordinates"]]} />;
      polyline.push(currentLine);
    }
    // polyline.push(locationList[i]["coordinates"])
    markerList.push(currentMarker);
  }

  console.log("polyline", polyline);
  console.log("markerList", markerList);

  return (
    <div id="map-border">
      <div id="map-container">
      <MapContainer center={centerOnUS} zoom={4} scrollWheelZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        { markerList }
        { polyline }
        {/*<Polyline pathOptions={{ color: 'grey' }} positions={polyline} />*/}
        {/*<SetViewOnClick />*/}
        <TravelMapLegend locations={locationList} />
      </MapContainer>
      </div>
    </div>
  );
}

export default TravelMap;