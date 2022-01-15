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

  if (props.url === "/") {
    mainPage = <TravelMap />;
  }
  else if (props.url === "/alex") {
    mainPage = <Alex />;
  }
  else if (props.url === "/keily") {
    mainPage = <Keily />;
  }

  return (
    <div id="defining-container">
      <div id="main-container">
        {mainPage}
      </div>
    </div>
  );
}

export default HomePage;