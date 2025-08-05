import React, { useState } from 'react'
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
import Box from '@mui/material/Box';
import DialogComp from './DialogComp';



function DrawList({toggleDrawer, handleWhatToShow}) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: "", description: "", 
      product: {
        title: "",
        description: "",
        price: 0,
        imageUrl: null,   
        imageFile: null,  
        stockQuantity: 0,
      }
    })
  // dialog
  const handleClickOpen = () => {
    setOpen(true);
    setDialogContent(
      {...dialogContent, title: "Add Product", description: "Enter the details of the new Product"}
    )
  };
  return (
    <>
    <DialogComp open={open} setOpen={setOpen} content={dialogContent} />
    <Box sx={{ width: 250 }} role="presentation"  onClick={() => toggleDrawer(false)}>
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

        <ListItem disablePadding onClick={() => {
            handleWhatToShow("products")
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <ViewInArIcon/>
                </ListItemIcon>
                <ListItemText primary={"Products"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
            handleWhatToShow("orders")
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary={"Orders"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
            handleClickOpen()
        }}>
            <ListItemButton>
                <ListItemIcon>
                    <AddBoxIcon/>
                </ListItemIcon>
                <ListItemText primary={"Add Product"}/>
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
    </>
  )
}

export default DrawList