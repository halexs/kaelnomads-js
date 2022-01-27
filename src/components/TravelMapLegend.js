// import { MapControl, withLeaflet } from "react-leaflet";
import { useMap } from "react-leaflet";
import React from 'react';
import L from "leaflet";
import "./TravelMapLegend.css";

class TravelMapLegend extends React.Component {

  createControl(locations, setOpen) {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("div", "info");
        // Default align is center, this allows left align
        panelDiv.align = "left";
        panelDiv.style.border = "solid black";
        panelDiv.style.padding = "4px 4px 4px 4px";
        panelDiv.style.backgroundColor = "#e9ebe6";
        let legendTitle = document.createElement("h3");
        legendTitle.innerHTML = "Places we've been"
        legendTitle.style.margin = "0";
        legendTitle.style.color = "black";
        panelDiv.appendChild(legendTitle);

        for (let i = 0; i < Object.keys(locations).length; i++) {
          let currentLocation = document.createElement("a");
          currentLocation.onclick = function() {
            map.setView(new L.LatLng(locations[i]["coordinates"][0], locations[i]["coordinates"][1]), 9);
            setOpen(i.toString());
            // setOpen("open" + i);
          };
          let duration = "";
          if (locations[i]["timeUnit"] === "D" && locations[i]["time"] === "1") {
            duration = "Overnight ";
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
            duration = `${timeStayed} ${unit}`;
          }
          currentLocation.innerHTML = `${duration} in ${locations[i]["city"]}, ${locations[i]["state"]}`;
          const linebreak = document.createElement("br");
          panelDiv.appendChild(currentLocation);
          panelDiv.appendChild(linebreak);

        }

        let resetMap = document.createElement("button");
        resetMap.onclick = function() {
          map.setView(new L.LatLng(37.61, -96.322), 4);
        };
        resetMap.innerHTML = "Reset Map";
        panelDiv.appendChild(resetMap);

        map.addEventListener("click", (ev) => {
          console.log(`Latitude, Longitude: ${ev.latlng}`);
        });

        return panelDiv;
      },
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const {map, locations, setOpen} = this.props;
    // console.log("props: ", this.props);
    const control = this.createControl(locations, setOpen);
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