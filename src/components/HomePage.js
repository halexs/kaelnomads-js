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
import FlightIcon from '@mui/icons-material/Flight';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
// import { FlightIcon, CatchingPokemonIcon, BakeryDiningIcon } from '@mui/icons-material';
// import CustomZeldaIcon from './CustomZeldaIcon';

// const useStyles = makeStyles({
//   button: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     height: '48px', // Ensure a consistent height
//   },
//   icon: {
//     marginRight: '8px', // Adjust spacing between icon and text
//   }
// });

function HomePage(props) {
  console.log("url: ", props.url);
  // const classes = useStyles();

  let mainPage: any = "";
  let pageMargins = {"margin": "8px 8px 8px 8px"};

  const nav = useNavigate();

  const navigate = (url) => {
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
          <Button onClick={() => navigate('/travel')} 
                  startIcon={<FlightIcon />}> Our Travels </Button>
          <Button onClick={() => navigate('/alex')} 
                  startIcon={<CatchingPokemonIcon />}> Alex's Profile </Button>
          <Button onClick={() => navigate('/keily')} 
                  startIcon={<BakeryDiningIcon />}> Keily's Profile </Button>
       </div>
      </Grid>
    </Grid>

  }

  else if (props.url === "/travel") {
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

export default HomePage;