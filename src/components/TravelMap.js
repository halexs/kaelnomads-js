import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./TravelMap.css"

import * as ELG from "esri-leaflet-geocoder";

function TravelMap(props:any) {

  function Geocoder(address:string) {
    // const coord = new ELG.
    // const map = useMap();
    // let elg_object:any = new ELG();

    ELG.geocode()
      .text(address)
      .run((err, results, response) => {
        console.log("results: ", results);
        // console.log("results: ", results.results[0].latlng);
        const { lat, lng } = results.results[0].latlng;
        return [lat,lng];
        // map.setView([lat, lng], 12);
      });

    // return null;
  }

  let test_coord:any = Geocoder("Fairfax, VA");
  console.log("test coord: ", test_coord);

  return (
    <div id="map-border">
      <MapContainer center={[37.61, -96.322]} zoom={4} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );

        // <Geocoder address="Fairfax, VA" />
        // <Marker position={[38.85, -77.342]}>
        //   <Popup>
        //     Fairfax County, VA <br /> Location 1
        //   </Popup>
        // </Marker>
        // <Marker position={[38.90, -77.02]}>
        //   <Popup>
        //     Washington, DC <br /> Location 2
        //   </Popup>
        // </Marker>
        // <Marker position={[39.12, -84.51]}>
        //   <Popup>
        //     Cincinnati, OH <br /> Location 2- Travel Stop 1
        //   </Popup>
        // </Marker>
        // <Marker position={[39.121, -94.58]}>
        //   <Popup>
        //     Kansas City, MO <br /> Location 2- Travel Stop 2
        //   </Popup>
        // </Marker>
        // <Marker position={[39.913, -104.95]}>
        //   <Popup>
        //     Denver, CO <br /> Location 3
        //   </Popup>
        // </Marker>

    // <div id="map">
    //   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    //     <TileLayer
    //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     <Marker position={[51.505, -0.09]}>
    //       <Popup>
    //         A pretty CSS3 popup. <br /> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   </MapContainer>
    // </div>

      // <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      //   <TileLayer
      //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //   />
      //   <Marker position={[51.505, -0.09]}>
      //     <Popup>
      //       A pretty CSS3 popup. <br /> Easily customizable.
      //     </Popup>
      //   </Marker>
      // </MapContainer>
}

export default TravelMap;