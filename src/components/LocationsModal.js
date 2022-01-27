import React from 'react';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
  // position: 'absolute' as 'absolute',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LocationsModal(props) {
  // let selected_index = parseInt(props.open);
  // if (selected_index in props.locations) {
  let selectedLocation = "";
  let title = "";
  let duration = "";
  if (props.open in props.locations) {
    selectedLocation = props.locations[props.open];
    console.log("current object", selectedLocation);
    
    // title = `${selectedLocation["city"]}, ${selectedLocation["state"]}`;
    duration += `${selectedLocation["time"]} `

    if (selectedLocation["timeUnit"] === "M") {
      duration += "Month";
    }
    else if (selectedLocation["timeUnit"] === "D") {
      duration += "Day";
    }

    if (selectedLocation["time"] > 1) {
      duration += "s";
    }
    title = `${selectedLocation["city"]}, ${selectedLocation["state"]} for ${duration}` 
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open !== ""}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >   
      {/*<Fade in={props.open !== ""}> </Fade>*/}

        <Box sx={style}>
          {/*<Button onClick={() => {console.log(props.open)}}> check open var </Button>*/}
          <Typography id="transition-modal-title" variant="h6" component="h2">
            { title }
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {/*Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
            ***Pictures Here***
          </Typography>
      </Box>
      
    </Modal>
  )
}

export default LocationsModal;