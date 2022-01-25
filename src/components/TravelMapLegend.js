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
        panelDiv.style.border = "solid black";
        panelDiv.style.padding = "4px 4px 4px 4px";
        panelDiv.style.backgroundColor = "#e9ebe6";

        let testLink = document.createElement("a");
        // testLink.onclick = function() {alert("this works"); console.log("maps: ", map); console.log("locs: ", locations); };
        testLink.onclick = function() {
          map.setView(new L.LatLng(39.4422, -105.2999), map.getZoom(), {
            animate: true,
          })
        };
        testLink.innerHTML = "clickable a link";

        {/* DOES NOT WORK: let testLink = <a onclick="() => alert('test2')" > for future components </a>; */}
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

        panelDiv.appendChild(testLink);
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