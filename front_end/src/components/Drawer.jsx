import * as React from 'react';
import Drawer from '@mui/material/Drawer';
// toglle buton
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// css
import '../styling/adminDashboardStyle.css'
import DrawList from './DrawList';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <ToggleButton className='toggle' onClick={toggleDrawer(true)} value="left" aria-label="left aligned"
      style={{fontSize: "10px", height: "20px", width: "20px"}}
      >
        <FormatAlignLeftIcon/>
      </ToggleButton>  
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawList  toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
}
