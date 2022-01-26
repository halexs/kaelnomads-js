import React from 'react';
import './App.css';
import HomePage from './components/HomePage';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

// import { makeStyles } from "@mui/core";

// const useStyles = makeStyles(theme => ({
//   indicator: {
//     backgroundColor: "green",
//     height: "10px",
//     top: "45px"
//   }
// }));

function App() {
  let currentSelected: number = 0;

  // let hideAppBar = false;
  let hideAppBar = "";
  // const [hideAppBar, setHideAppBar] = React.useState("");
  // const changeVisibility = (show) => {
  //   console.log("changing visibility to: ");
  //   if (show === true) {
  //     // hideAppBar = "";
  //     setHideAppBar("")
  //     console.log("show");
  //     // hideAppBar["visibililty"] = "";
  //   }
  //   else {
  //     // hideAppBar = "hidden";
  //     setHideAppBar("hidden")
  //     console.log("hidden");
  //   }
  // }

  if (window.location.pathname === "/") {
    console.log("inside / now");
    currentSelected = 0;
    hideAppBar = "hidden";
    // hideAppBar["display"] = "none";
    // hideAppBar["display"] = "block";
    // hideAppBar["visibility"] = "hidden";
    // hideAppBar["visibility"] = "visible";

  }
  else if (window.location.pathname === "/travel") {
    console.log("inside travel now");
    currentSelected = 1;
  }
  else if (window.location.pathname === "/alex") {
    currentSelected = 2;
  }
  else if (window.location.pathname === "/keily") {
    currentSelected = 3;
  }

  const [selectedTab, setSelectedTab] = React.useState(currentSelected);

  return (
    <BrowserRouter>
      <div className="App">
      {/*hideAppBar*/}
        <AppBar color="transparent" style={{"visibility": selectedTab === 0 ? "hidden" : "visible"}} id="app-bar-style" position="static" elevation={0}>
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
            <Tab style={{color: "white"}} label="Home" component={Link} to="/" />
            <Tab style={{color: "white"}} label="Adventures" component={Link} to="/travel" />
            <Tab style={{color: "white"}} label="Alex" component={Link} to="/alex" />
            <Tab style={{color: "white"}} label="Keily" component={Link} to="/keily" />
          </Tabs>
          </Toolbar>
        </AppBar>

        {/*<div hidden={currentSelected !== 0}> main menu part 2</div>*/}

        <Routes>
          {/*<Route path="/" element={<div></div>} /> */}
          <Route path="/" element={<HomePage url="/" changeTab={setSelectedTab} />} />
          <Route path="/travel" element={<HomePage url="/travel" changeTab={setSelectedTab} />} />
          <Route path="/alex" element={<HomePage url="/alex" changeTab={setSelectedTab} />} />
          <Route path="/keily" element={<HomePage url="/keily" changeTab={setSelectedTab} />} />
          {/*
          <Route path="/" element={<HomePage url="/" />} />
          <Route path="/travel" element={<HomePage url="/travel" />} />
          <Route path="/alex" element={<HomePage url="/alex" />} />
          <Route path="/keily" element={<HomePage url="/keily" />} />*/}

          {/*<Route path="/" element={<HomePage changeVisibility={changeVisibility} url="/" />} />
          <Route path="/travel" element={<HomePage changeVisibility={changeVisibility} url="/travel" />} />
          <Route path="/alex" element={<HomePage changeVisibility={changeVisibility} url="/alex" />} />
          <Route path="/keily" element={<HomePage changeVisibility={changeVisibility} url="/keily" />} />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;