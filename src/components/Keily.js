import React from 'react';
import Typography from '@mui/material/Typography';

function Keily(props) {

  // Meme links: https://giphy.com/gifs/kKdgdeuO2M08M
  // Link2: https://old.reddit.com/r/funny/comments/s74aks/chomp/
        // <img src="https://old.reddit.com/r/funny/comments/s74aks/chomp/" alt="Keily is hungry" />
        
        // {/*<img src="https://v.redd.it/66yac5glphc81/DASH_1080.mp4" alt="Keily is hungry" />*/}
        // {/*<br />*/}
        // {<video width="500" height="400" muted="muted" >
        //     <source src="https://v.redd.it/66yac5glphc81/DASH_1080.mp4" type="video/mp4" />
        // </video>}

  return (
    <div style={{width: "60%"}}>

      <Typography id="transition-modal-title" variant="h6" component="h2">
        About Me
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        This page is under construction
        <br />
        <img src="https://media.giphy.com/media/kKdgdeuO2M08M/giphy.gif" alt="Keily when I told her I'm making a website in AWS" />
      </Typography>
    </div>
  );
}

export default Keily;