import React from 'react'
import TravelMap from './TravelMap';
import Alex from './Alex';
import Keily from './Keily';
import "./HomePage.css"

import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

// const styles = {
//   container: {
//     margin: "8px 8px 8px 8px",
//   },
// };

function HomePage(props) {
  console.log("url: ", props.url);
  let mainPage: any = "";
  let pageMargins = {"margin": "8px 8px 8px 8px"};

  // this is preferred due to perfformance
  // const navigate = useNavigate();
    // let n = useNavigate();
  const nav = useNavigate();

  // the following block works
  // UPDATE: fixed navigation
  const navigate = (url) => {
    // window.location.href = url;
    // alert("changing tabs now");
    // props.changeTab(2);
    let newTab = 0;

    if (url === "/travel") {
      newTab = 1
    }
    else if (url === "/alex") {
      newTab = 2
    }
    else if (url === "/keily") {
      newTab = 3
    }
    props.changeTab(newTab);
    nav(url);
  }

  // const handleClick = () => {
  //   props.changeTab
  //   navigate("/path/to/push");
  // }

  if (props.url === "/") {
    // props.changeVisibility(false);
    pageMargins["margin"] = "";
    mainPage = <div id="main-page"> main page </div>;
    mainPage = <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '85vh' }}
    >

      <Grid item xs={3}>
       <div id="main-page">
          <Button onClick={() => navigate('/travel')} > Our Travels </Button>
          <Button onClick={() => navigate('/alex')} > Alex's Profile </Button>
          <Button onClick={() => navigate('/keily')} > Keily's Profile </Button>
          Test this text
       </div>
      </Grid>   
    </Grid> 

    // mainPage = <Redirect to="/travel" />
  }
  else if (props.url === "/travel") {
    // props.changeVisibility(true);
    mainPage = <TravelMap isMobile={props.isMobile} />;
  }
  else if (props.url === "/alex") {
    mainPage = <Alex isMobile={props.isMobile} />;
  }
  else if (props.url === "/keily") {
    mainPage = <Keily isMobile={props.isMobile} />;
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