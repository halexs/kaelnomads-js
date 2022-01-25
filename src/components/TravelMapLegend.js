// import { MapControl, withLeaflet } from "react-leaflet";
import { useMap } from "react-leaflet";
import React from 'react';
import L from "leaflet";

class TravelMapLegend extends React.Component {

  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("div", "info");

        map.addEventListener("mousemove", (ev) => {
          panelDiv.innerHTML = `<h2><span>Lat: ${ev.latlng.lat.toFixed(4)}</span>&nbsp;<span>Lng: ${ev.latlng.lng.toFixed(4)}</span></h2>`;
          console.log(panelDiv.innerHTML);
        });
        return panelDiv;
      },
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const {map} = this.props;
    const control = this.createControl();
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