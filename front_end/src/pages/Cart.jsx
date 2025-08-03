import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import Button from '@mui/material/Button';
// style
import '../styling/cartPageStyle.css'
import { Link, useNavigate } from 'react-router-dom';
// context
import { useCartData } from '../contexts/CartContext';


function Cart() {
  const {cartData, setCartData} = useCartData();
  const listOfProductsAdded = cartData.map((prod) => {
    return  <CartItem product={prod} key={prod.id}/>
  })

  const navigate = useNavigate()

  useEffect(() => {
    if(cartData.length === 0 && JSON.parse(localStorage.getItem("cartData")) !== null ) {
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cartData"))
      setCartData(cartDataFromLocalStorage)
    }
  }, [cartData, setCartData])

  let totalPrice = 0;

  const listOfOrderSummaryList = cartData.map((prod) => {
    totalPrice += prod.price * prod.quantity 
    return ( 
    <div className='item'>
      <p>
        <span>x{prod.quantity}</span>
        {prod.title}
      </p>
      <span>${(prod.price * prod.quantity).toFixed(2)}</span>
    </div>
    );
  })

  function noProducts() {
    if(cartData.length === 0) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}>
          <p>Your cart is empty</p>
            <Button size="small" variant="contained" style={{backgroundColor: "#6366F1"}}
            onClick={() => navigate("/")}
            >Continue Shopping</Button>
        </div>
      )
    }
  }
  return (
    <>
    <div className='cart'>
        <h1>Your Cart</h1>
        {noProducts()}
        {cartData.length !== 0 &&
        <div className='cart-content'>
            <div className='cart-items'>
                {listOfProductsAdded}
            </div>
            <div className='order-summary'>
                <div>
                    {listOfOrderSummaryList}
                    <div className='total'>
                        <div>
                            <h4>Total</h4>
                            <span className='total'>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Link to={"/checkout"}>
                            <Button variant="contained" disableElevation
                            style={{width: "100%"}}
                            >Proceed to Checkout</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>}
    </div>
  </>
  )
}

export default Cart