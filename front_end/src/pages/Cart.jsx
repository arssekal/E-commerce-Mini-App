import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import Button from '@mui/material/Button';
// style
import '../styling/cartPageStyle.css'
import { Link, useNavigate } from 'react-router-dom';
// context
import { useCartData } from '../contexts/CartContext';
// icons
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


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
        <div className='empty-cart'>
          <ShoppingBasketIcon className='shop-icon'/>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Button size="small" variant="contained" style={{backgroundColor: "#6366F1"}}
            onClick={() => {navigate("/"); window.location.reload()}}
          >Continue Shopping</Button>
        </div>
      )
    }
  }
  return (
    <>
    <div className='cart'>
        {noProducts()}
        {cartData.length !== 0 &&
        <h1>Your Cart</h1> &&
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
                            className='proceed-checkout'
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