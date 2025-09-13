import React, { useState } from 'react'
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
import LogoutIcon from '@mui/icons-material/Logout';
// css
import "../styling/adminDashboardStyle.css"
import { Link } from 'react-router-dom';



function DrawList({closeDrawer, handleWhatToShow}) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: "", description: "", 
      product: {
        title: "",
        description: "",
        price: 0,
        // change,
        oldPrice: 0,
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
    <DialogComp open={open} setOpen={setOpen} content={dialogContent}/>
    <Box sx={{ 
      width: 250, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", 
      height: "100%",
      background: "linear-gradient(90deg, #a0e6dc, #c7f8e0)"
    }} role="presentation"  
    >
      <div>
      <List style={{marginLeft: "15px"}}>
        <h2>Admin Panel</h2>
        <p>E-commerce Store</p>
      </List>
      <Divider />
      <List>

        <ListItem disablePadding onClick={() => {
          handleWhatToShow("dashboard")
          closeDrawer();
        }}>
          <ListItemButton sx={{ 
            "&:hover": { backgroundColor: "rgba(84, 252, 148, 0.45)" }, // light green hover
            "&.Mui-selected": { backgroundColor: "rgba(56, 239, 125, 0.2)", color: "#11998e" }
          }} >
              <ListItemIcon>
                  <HomeFilledIcon className='home-icon'/>
              </ListItemIcon>
              <ListItemText primary={"dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
            handleWhatToShow("products")
            closeDrawer();
        }}>
            <ListItemButton sx={{ 
              "&:hover": { backgroundColor: "rgba(84, 252, 148, 0.45)" }, // light green hover
              "&.Mui-selected": { backgroundColor: "rgba(56, 239, 125, 0.2)", color: "#11998e" }
            }} >
                <ListItemIcon>
                    <ViewInArIcon className='products-icon'/>
                </ListItemIcon>
                <ListItemText primary={"Products"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
            handleWhatToShow("orders")
            closeDrawer();
        }}>
            <ListItemButton sx={{ 
              "&:hover": { backgroundColor: "rgba(84, 252, 148, 0.45)" }, // light green hover
              "&.Mui-selected": { backgroundColor: "rgba(56, 239, 125, 0.2)", color: "#11998e" }
            }} >
                <ListItemIcon>
                    <InventoryIcon className='orders-icon'/>
                </ListItemIcon>
                <ListItemText primary={"Orders"} />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => {
          handleClickOpen()
        }}>
            <ListItemButton sx={{ 
              "&:hover": { backgroundColor: "rgba(84, 252, 148, 0.45)" }, // light green hover
              "&.Mui-selected": { backgroundColor: "rgba(56, 239, 125, 0.2)", color: "#11998e" }
            }} >
                <ListItemIcon>
                    <AddBoxIcon className='add-product-icon'/>
                </ListItemIcon>
                <ListItemText primary={"Add Product"}/>
            </ListItemButton>
        </ListItem>
      </List>
      </div>
      <div>
      <Divider />
      <List style={{marginLeft: "15px", padding: "20px 0px"}}>
        <Link to={'/'}>
        <div className='admin-logout'>
          <LogoutIcon style={{color: "red"}}/>
          <span className='log-out-span' style={{color: "red"}}>Log Out</span>
        </div>
        </Link>
      </List>
      </div>
    </Box>
    </>
  )
}

export default DrawList