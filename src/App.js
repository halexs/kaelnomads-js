import React from 'react';
import './App.css';
import HomePage from './components/HomePage';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#0000FF"
  //   }
  // }
});

function App() {
  let currentSelected: number = 0;

  if (window.location.pathname === "/") {
    currentSelected = 0;
  }
  else if (window.location.pathname === "/travel") {
    currentSelected = 1;
  }
  else if (window.location.pathname === "/alex") {
    currentSelected = 2;
  }
  else if (window.location.pathname === "/keily") {
    currentSelected = 3;
  }

  const [selectedTab, setSelectedTab] = React.useState(currentSelected);
  // Check if device is mobile or desktop based on screen size
  const [width, setWidth] = React.useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  console.log("Device is mobile: ", isMobile);

  return (

    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div className="App">
        <AppBar color="transparent" style={{"visibility": selectedTab === 0 ? "hidden" : "visible"}} id="app-bar-style" position="static" elevation={0}>
          <Toolbar>
          <div style={{color: "white"}}> Welcome to Alex and Keily's Adventure!
          </div>
          <div className="right-align"></div>
          <Tabs
            value={selectedTab}
            onChange={(event,value) => setSelectedTab(value)}
            indicatorColor="primary"
            variant="scrollable"
            allowScrollButtonsMobile
            textColor="primary"
            aria-label="basic tabs example" 
            // centered
          >
            <Tab style={{color: "white"}} label="Home" component={Link} to="/" />
            <Tab style={{color: "white"}} label="Adventures" component={Link} to="/travel" />
            <Tab style={{color: "white"}} label="Alex" component={Link} to="/alex" />
            <Tab style={{color: "white"}} label="Keily" component={Link} to="/keily" />
          </Tabs>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<HomePage isMobile={isMobile} url="/" changeTab={setSelectedTab} />} />
          <Route path="/travel" element={<HomePage isMobile={isMobile} url="/travel" changeTab={setSelectedTab} />} />
          <Route path="/alex" element={<HomePage isMobile={isMobile} url="/alex" changeTab={setSelectedTab} />} />
          <Route path="/keily" element={<HomePage isMobile={isMobile} url="/keily" changeTab={setSelectedTab} />} />
        </Routes>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;