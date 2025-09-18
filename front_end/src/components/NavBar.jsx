import React, { useEffect, useState } from 'react'
// materila ui
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// context
import { useCartData } from '../contexts/CartContext';
// styling
import '../styling/navBarStyle.css'
import { Link, useNavigate } from 'react-router-dom';
// propover
import Popover from '@mui/material/Popover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
//
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function NavBar() {
  const {productCount, setProductCount} = useCartData();
  useEffect(() => {
    if(productCount === 0 && Number(JSON.parse(localStorage.getItem("productsCount"))) !== 0) {
      setProductCount(Number(JSON.parse(localStorage.getItem("productsCount"))))
    }
  }, [productCount, setProductCount])

  // drop down menu
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  function visiteCart() {
    navigate("/cart")
    // window.location.reload(); // you can delete this
  }

  
  return (
    <>
      <BasicPopover anchorEl={anchorEl} handleAnchorClose={handleAnchorClose} handleClick={handleClick}/>
      <AppBar sx={{
      position: "fixed",
      background: "linear-gradient(90deg,rgb(31, 7, 139),rgb(1, 101, 250))",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
      color: "#fff", 
      zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
        <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleClick}
          sx={{
            mr: 2,
            backgroundColor: "rgba(255,255,255,0.1)", // subtle hover base
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          }}
        >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Shop
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Badge badgeContent={productCount} color="secondary" className='shop-cart'
          onClick={visiteCart}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#FF5722", // your personalized color
              color: "white",             // text color
            }
          }}
          >
            <ShoppingCartIcon color="action" style={{color: "white"}}/>
          </Badge>
          <div className='log-in'>
            <Button 
            size="small" 
            variant="outlined" 
            startIcon={<AccountCircleIcon style={{fontSize: "30px"}}/>}
            >Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className='space'></div>
    </>
  )
}

export default NavBar


function BasicPopover({anchorEl, handleAnchorClose}) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='drop-down'>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleAnchorClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Link to="/admin">
            <div className='admin-login'>
              <AccountCircleIcon/>
              <span>Admin Login</span>
            </div>
          </Link>
        </Typography>
      </Popover>
    </div>
  );
}