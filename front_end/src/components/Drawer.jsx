import * as React from 'react';
import Drawer from '@mui/material/Drawer';
// toglle buton
import ToggleButton from '@mui/material/ToggleButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';// css
import '../styling/adminDashboardStyle.css'
import DrawList from './DrawList';
import { useState } from 'react';

export default function TemporaryDrawer({handleWhatToShow}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    console.log("drawer")
  };

  return (
    <div className='temporary-drawer'>
      <ToggleButton className='toggle' onClick={toggleDrawer(true)} value="left" aria-label="left aligned"
      style={{fontSize: "10px", height: "20px", width: "20px", color: "white"}}
      >
        <MenuOutlinedIcon/>
      </ToggleButton>  
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawList  toggleDrawer={toggleDrawer} handleWhatToShow={handleWhatToShow}/>
      </Drawer>
    </div>
  );
}
