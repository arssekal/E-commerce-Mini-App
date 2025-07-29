import React from 'react'
// material ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// style
import '../styling/checkoutStyle.css';
// context
import { useCartData } from '../contexts/CartContext';

function Checkout() {
  const {cartData} = useCartData();
  let totalPrice = 0;
  const listOfOrders = cartData.map((prod) => {
    totalPrice += prod.price * prod.quantity 
    return ( 
    <div className='order-item'>
        <div className='first-div'>
            <img src={prod.imageUrl} alt={prod.title} />
            <div>
                <h5>{prod.title}</h5>
                <p>Qty: <span>{prod.quantity}</span></p>
            </div>
        </div>
        <span className='price'>${(prod.price * prod.quantity).toFixed(2)}</span>
    </div>
    );
  })
  return (
    <div className='checkout'>
        <h1>Checkout</h1>
        <div className='checkout-content'>
            <div className='shipping-info'>
                <h2>Shipping Information</h2>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1} }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" required fullWidth label="name" variant="outlined" />
                    <TextField id="outlined-basic" required fullWidth label="email" type='email' variant="outlined" />
                    <TextField id="outlined-basic" required fullWidth label="Shipping Address" variant="outlined" />    
                    <TextField id="outlined-basic" fullWidth label="Notes (Optional)" variant="outlined" />    
                    <Button variant="contained" disableElevation
                        style={{width: "100%"}}
                        >
                            Place Order | <span style={{marginLeft: "5px"}}>${totalPrice}</span>
                    </Button>
                </Box>
            </div>
            <div className='order-summary'>
                <h4>Order Summary</h4>
                <div className='summary'>
                    {listOfOrders}
                </div>
                <div className='total'>
                    <h4>Total</h4>
                    <span className='total-price'>${totalPrice}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout