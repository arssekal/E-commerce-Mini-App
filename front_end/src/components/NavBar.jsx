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
import { Link } from 'react-router-dom';
// propover
import Popover from '@mui/material/Popover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <>
    <BasicPopover anchorEl={anchorEl} handleAnchorClose={handleAnchorClose} handleClick={handleClick}/>
      <AppBar style={{position: "fixed"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ArssekalShop
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
          <div  className='shop-cart'>
            <span>{productCount}</span>
            <Link to={"/cart"}>
              <div>
                <ShoppingCartIcon className='icon-cart'/>
              </div>
            </Link>
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