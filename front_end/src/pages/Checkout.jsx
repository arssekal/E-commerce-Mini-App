import React, { useEffect, useState } from 'react'
// material ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// style
import '../styling/checkoutStyle.css';
// context
import { useCartData } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { addOrder } from '../service/OrderService';
import { updateStock } from '../service/ProductService';

// make sure that the requested products are in the stock !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// before proceeding to checkout


function Checkout() {

  const {cartData, setCartData, setProductCount} = useCartData();
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    status: "pending",
    address: "",
    notes: "Notes are not provided"
  })
  const [validateClientInfo, setValidateClientInfo] = useState({
    isNameInValid: false,
    isEmaiInlValid: false,
    isAddressInValid: false,
    isPhonelnValid: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    if(cartData.length === 0 && JSON.parse(localStorage.getItem("cartData")) !== null ) {
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cartData"))
      setCartData(cartDataFromLocalStorage)
    }
  }, [cartData, setCartData])

  let totalPrice = 0;

  // handlers
  function handleNameChange(e) {
      setClientInfo({...clientInfo, name: e.target.value})
      setValidateClientInfo({...validateClientInfo, isNameInValid: e.target.value.trim() === ""})
  } 
  function handleEmailChange(e) {
      setClientInfo({...clientInfo, email: e.target.value})
      setValidateClientInfo({...validateClientInfo, isEmaiInlValid: isEmailInvalidCheck(e.target.value)})
  } 
  function handlePhoneChange(e) {
      setClientInfo({...clientInfo, phone: e.target.value})
      setValidateClientInfo({...validateClientInfo, isPhonelnValid: isPhoneInvalidCheck(e.target.value)})
  } 
  function handleAddressChange(e) {
      setClientInfo({...clientInfo, address: e.target.value})
      setValidateClientInfo({...validateClientInfo, isAddressInValid: e.target.value.trim() === ""})
  } 
  function handleNotesChange(e) {
      setClientInfo({...clientInfo, notes: e.target.value})
  } 
  // other functions 
  function isEmailInvalidCheck(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailRegex.test(email)
  }
  function isPhoneInvalidCheck(phone) {
      const phoneRegex = /^(?:\+212|00212|212|0)?[\-]?[6-7]\d{8}$/;
      return !phoneRegex.test(phone)
  }
  function disabeOrderBtn() {
      return(
          validateClientInfo.isNameInValid  ||
          validateClientInfo.isEmaiInlValid ||
          validateClientInfo.isPhonelnValid ||
          validateClientInfo.isAddressInValid
      )  
  }
  // handle client order
  function handleOrder() {
      setValidateClientInfo(
          {
              isNameInValid: clientInfo.name.trim() === "",
              isEmaiInlValid: isEmailInvalidCheck(clientInfo.email),
              isAddressInValid: clientInfo.address.trim() === "",
              isPhonelnValid: isPhoneInvalidCheck(clientInfo.phone)
          }
      )
      const clienInfoInValid = clientInfo.name.trim() === "" ||
                               isEmailInvalidCheck(clientInfo.email) ||
                               clientInfo.address.trim() === "" ||
                               isPhoneInvalidCheck(clientInfo.phone)
                              
      if(!clienInfoInValid) {
          localStorage.removeItem("cartData")
          localStorage.removeItem("productsCount")  
          addOrder(makeOrder(clientInfo, cartData))  

          // here decrese the stock quantity of the selled products
          const soldItems = cartData.map((item) => {
            return {
              productId: item.id,
              quantity: item.quantity,
            }
          })

          updateStock(soldItems)
          
          setCartData([])
          setProductCount(0)  
          navigate("/order-success")                        
      } 
  }  
  function makeOrder(clinetInformations, cartData) {
      let totalPrice = 0
      const items = cartData.map((item) => {
        totalPrice += item.price * item.quantity 
        return {
          product: { "id": item.id },
          quantity: item.quantity,
          unitPrice: item.price
        }
      })
      return {
        customerName: clinetInformations.name,
        email: clinetInformations.email,
        address: clinetInformations.address,
        phone: clinetInformations.phone,
        status: clinetInformations.status,
        total: totalPrice.toFixed(2),
        orderDate: new Date().toLocaleDateString('en-CA'),
        isSeen: false,
        items: items
      }
  }  
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
                    <TextField id="outlined-basic" required fullWidth label="name" variant="outlined" 
                    error={validateClientInfo.isNameInValid}
                    onChange={handleNameChange}
                    />
                    <TextField id="outlined-basic" required fullWidth label="email"  variant="outlined" 
                    error={validateClientInfo.isEmaiInlValid}
                    onChange={handleEmailChange}
                    />
                    <TextField id="outlined-basic" required fullWidth label="Phone Number"  variant="outlined" 
                    error={validateClientInfo.isPhonelnValid}
                    onChange={handlePhoneChange}
                    />
                    <TextField id="outlined-basic" required fullWidth label="Shipping Address" variant="outlined" 
                    error={validateClientInfo.isAddressInValid}
                    onChange={handleAddressChange}
                    />    
                    <TextField id="outlined-basic" fullWidth label="Notes (Optional)" variant="outlined" 
                    onChange={handleNotesChange}
                    />    
                    <Button variant="contained" disableElevation
                        style={{width: "100%"}}
                        onClick={handleOrder}
                        disabled={disabeOrderBtn()}
                        >
                            Place Order | <span style={{marginLeft: "5px"}}>${totalPrice.toFixed(2)}</span>
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
                    <span className='total-price'>${totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout