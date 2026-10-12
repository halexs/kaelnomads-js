import React from 'react'
import TravelMap from './TravelMap';
import Alex from './Alex';
import Keily from './Keily';
import "./HomePage.css"

// import Typography from '@mui/material/Typography'
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

  let mainPage = "";
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
    mainPage = (
      <div className="hero">
        <h1 className="hero-title">Alex &amp; Keily's Adventure</h1>
        <p className="hero-subtitle">Follow our trip across the country, one stop at a time.</p>
        <div className="hero-cards">
          <button className="hero-card" onClick={() => navigate('/travel')}>
            <span className="icon"><FlightIcon /></span>
            <span className="label">Our Travels</span>
            <span className="caption">Explore the map</span>
          </button>
          <button className="hero-card" onClick={() => navigate('/alex')}>
            <span className="icon"><CatchingPokemonIcon /></span>
            <span className="label">Alex's Profile</span>
            <span className="caption">Code, cloud &amp; coffee</span>
          </button>
          <button className="hero-card" onClick={() => navigate('/keily')}>
            <span className="icon"><BakeryDiningIcon /></span>
            <span className="label">Keily's Profile</span>
            <span className="caption">Snacks &amp; studies</span>
          </button>
        </div>
      </div>
    );
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