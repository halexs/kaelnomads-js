import React from 'react'
import TravelMap from './TravelMap';
import Alex from './Alex';
import Keily from './Keily';
import "./HomePage.css"

// const styles = {
//   container: {
//     margin: "8px 8px 8px 8px",
//   },
// };

function HomePage(props) {
  console.log("url: ", props.url);
  let mainPage: any = "";
  let pageMargins = {"margin": "8px 8px 8px 8px"}

  if (props.url === "/") {
    pageMargins["margin"] = "";
    mainPage = <div> main page </div>;
  }
  else if (props.url === "/travel") {
    mainPage = <TravelMap />;
  }
  else if (props.url === "/alex") {
    mainPage = <Alex />;
  }
  else if (props.url === "/keily") {
    mainPage = <Keily />;
  }

  return (
    <div style={pageMargins} id="defining-container">
      {mainPage}
    </div>
  );
}
      // <div id="main-container">
      //   {mainPage}
      // </div>

export default HomePage;