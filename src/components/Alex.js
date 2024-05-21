import React from 'react';
import Typography from '@mui/material/Typography';

function Alex(props) {

  let textColor = "black";
  if (props.isMobile) {
    textColor = "black";
  }


  return (
    <div style={{width: "60%", color: textColor}}>

      <Typography id="transition-modal-title" variant="h6" component="h2">
        About Me
      </Typography>

      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Going to re-start development on the website!
      </Typography>
      
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Hi Everyone, I'm mostly a software developer with experience in System Adminstration and DevOps. I created this website while my partner is in school to have something to do. Here is my resume: <a href="https://kaelnomads.com/public_resources/resume_alex.pdf">link</a>
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Email: a.hsu94@gmail.com
      </Typography>
    </div>
  );
}

export default Alex;