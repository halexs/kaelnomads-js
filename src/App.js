import React from 'react';
import './App.css';
import HomePage from './components/HomePage';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { AppBar } from '@mui/material';

function App() {
  let currentSelected: number = 0;

  if (window.location.pathname === "/") {
    currentSelected = 0;
  }
  else if (window.location.pathname === "/alex") {
    currentSelected = 1;
  }
  else if (window.location.pathname === "/keily") {
    currentSelected = 2;
  }

  const [selectedTab, setSelectedTab] = React.useState(currentSelected);

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar id="app-bar-style" position="static" color="default" elevation={0}>
          <Toolbar>
          <div> Welcome to Alex and Keily's Adventure!
          </div>
          <div className="right-align"></div>
          <Tabs
            value={selectedTab}
            onChange={(event,value) => setSelectedTab(value)}
            indicatorColor="primary"
            textColor="primary"
            aria-label="basic tabs example" centered
          >
            <Tab label="Adventures" component={Link} to="/" />
            <Tab label="Alex" component={Link} to="/alex" />
            <Tab label="Keily" component={Link} to="/keily" />
          </Tabs>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<HomePage url="/" />} />
          <Route path="/alex" element={<HomePage url="/alex" />} />
          <Route path="/keily" element={<HomePage url="/keily" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;