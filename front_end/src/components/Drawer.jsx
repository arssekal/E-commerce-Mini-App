import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// icons
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
// toglle buton
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// css
import '../styling/adminDashboardStyle.css'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [openToggle, setOpenToggle] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List style={{marginLeft: "15px"}}>
        <h2>Admin Panel</h2>
        <p>E-commerce Store</p>
      </List>
      <Divider />
      <List>

        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <HomeFilledIcon />
                </ListItemIcon>
                <ListItemText primary={"dashboard"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <ViewInArIcon/>
                </ListItemIcon>
                <ListItemText primary={"Products"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary={"Orders"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <AddBoxIcon/>
                </ListItemIcon>
                <ListItemText primary={"Add Product"} />
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <ToggleButton className='toggle' onClick={toggleDrawer(true)} value="left" aria-label="left aligned"
      style={{fontSize: "10px", height: "20px", width: "20px"}}
      >
        <FormatAlignLeftIcon />
      </ToggleButton>  
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
