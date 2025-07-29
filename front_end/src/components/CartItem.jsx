import React from 'react'
// materila ui
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// style
import '../styling/cartItemStyle.css'
// context
import { useCartData } from '../contexts/CartContext';


function CartItem({product}) {
  const {cartData, setCartData, setProductCount} = useCartData()

  function handleAddProductCount() {
    const updatedCartData = [...cartData].map((p) => {
        if(p.id === product.id) {
          return {
              ...p,
              quantity: p.quantity + 1
            }
        }
        return p
    })
    setProductCount((prev) => prev + 1)
    setCartData(() => updatedCartData)
  }
  function handleRemoveProductCount() {
    if(product.quantity === 1) {
        deleteProduct()
        return;
    }
    const updatedCartData = cartData.map((p) => {
        if(p.id === product.id) {
          return {
            ...p,
            quantity: p.quantity - 1
          }
        }
        return p
    })
    setProductCount((prev) => prev - 1)
    setCartData(() => updatedCartData)
  }

  function deleteProduct() {
    const cartDataAfterDeletion = cartData.filter((p) => {
        return p.id !== product.id
    })
    setProductCount((prev) => prev - product.quantity)
    setCartData(cartDataAfterDeletion)
  }
  return (
    <div className='cart-item'>
        <div className='box'>
            <div className='image'>
                <img src={product.imageUrl} alt={product.title}/>
            </div>
            <div className='cart-content'>
                <p>{product.title}</p>
                <span>${(product.price).toFixed(2)}</span>
            </div>
        </div>

        <div className='add-remove'>
            <div className='btn'
            onClick={handleAddProductCount}
            >
                <AddIcon/>
            </div>
            <span>{product.quantity}</span>
            <div className='btn'
            onClick={handleRemoveProductCount}
            >
                <RemoveIcon/>
            </div>
            <div className='btn delete'
            onClick={deleteProduct}
            >
                <DeleteOutlineIcon/>
            </div>
        </div>
    </div>
  )
}

export default CartItem