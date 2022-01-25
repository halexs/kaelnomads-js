// import { MapControl, withLeaflet } from "react-leaflet";
import { useMap } from "react-leaflet";
import React from 'react';
import L from "leaflet";
import "./TravelMapLegend.css";

class TravelMapLegend extends React.Component {

  createControl(locations) {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("div", "info");
        panelDiv.align = "left";
        panelDiv.style.border = "solid black";
        panelDiv.style.padding = "4px 4px 4px 4px";
        panelDiv.style.backgroundColor = "#e9ebe6";
        let legendTitle = document.createElement("h3");
        legendTitle.innerHTML = "Places we've been"
        legendTitle.style.margin = "0";
        // const linebreak = document.createElement("br");
        panelDiv.appendChild(legendTitle);
        // panelDiv.appendChild(linebreak);


        for (let i = 0; i < Object.keys(locations).length; i++) {
          let currentLocation = document.createElement("a");
          currentLocation.onclick = function() {
            map.setView(new L.LatLng(locations[i]["coordinates"][0], locations[i]["coordinates"][1]))
          }
          let duration = "";
          if (locations[i]["timeUnit"] === "D" && locations[i]["time"] === "1") {
            duration = "Overnight "
          }
          else {
            let unit = "";
            let timeStayed = locations[i]["time"];
            if (locations[i]["timeUnit"] === "D") {
              unit = "Day";
            }
            else if (locations[i]["timeUnit"] === "M") {
              unit = "Month";
            }
            if (timeStayed > 1) {
              unit += "s";
            }
            duration = `${timeStayed} ${unit}`
          }
          currentLocation.innerHTML = `${duration} in ${locations[i]["city"]}, ${locations[i]["state"]}`;
          const linebreak = document.createElement("br");
          panelDiv.appendChild(currentLocation);
          panelDiv.appendChild(linebreak);

        }

        // let testLink = document.createElement("a");
        // // testLink.onclick = function() {alert("this works"); console.log("maps: ", map); console.log("locs: ", locations); };
        // testLink.onclick = function() {
        //   map.setView(new L.LatLng(39.4422, -105.2999), map.getZoom(), {
        //     animate: true,
        //   })
        // };
        // testLink.innerHTML = "clickable a link";

        /* DOES NOT WORK: let testLink = <a onclick="() => alert('test2')" > for future components </a>; */
        // testLink.style.color = "blue";
        // panelDiv.innerHTML = "this is the legend";
        // panelDiv.innerHTML = "<a onclick={() => {alert('hello')}}> clickable legend </a>";

        // <h2><span>Lat: 39.4422</span>&nbsp;<span>Long: -105.2999</span></h2>

        // map.addEventListener("click", (ev) => {
        //   // let displayText = `<h2><span>Lat: ${ev.latlng.lat.toFixed(4)}</span>&nbsp;<span>Long: ${ev.latlng.lng.toFixed(4)}</span></h2>`;
        //   let displayText = `<h2><span>Lat and Lng: ${ev.latlng}</span></h2>`;
        //   panelDiv.innerHTML = displayText;
        //   console.log(displayText);
        // });

        // panelDiv.appendChild(testLink);
        return panelDiv;
      },
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const {map, locations} = this.props;
    // console.log("props", this.props);
    // const {locations} = this.props;
    // console.log("locations", this.props["locations"]);
    // console.log("locations", locations);
    const control = this.createControl(locations);
    control.addTo(map);
  }

  render() {
    return null;
  }

}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(TravelMapLegend);