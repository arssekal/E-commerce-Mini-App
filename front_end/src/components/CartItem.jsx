import React, { useEffect, useState } from 'react'
// materila ui
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// style
import '../styling/cartItemStyle.css'
// context
import { useCartData } from '../contexts/CartContext';


function CartItem({product}) {
  const {cartData, setCartData, setProductCount, productCount} = useCartData()
   const [quantity, setQuantity] = useState(0);

  function handleAddProductCount() {
    if(product.stockQuantity <= quantity) return
    const updatedCartData = [...cartData].map((p) => {
        if(p.id === product.id) {
          setQuantity(p.quantity + 1)
          localStorage.setItem('orderedQuantity'+ product.id, p.quantity + 1)
          return {
              ...p,
              quantity: p.quantity + 1
            }
        }
        return p
    })
    setProductCount((prev) => prev + 1)
    localStorage.setItem("productsCount", productCount+1)
    setCartData(() => updatedCartData)
    localStorage.setItem("cartData", JSON.stringify(updatedCartData))

  }

  function handleRemoveProductCount() {
    if(product.quantity === 1) {
        deleteProduct()
        localStorage.removeItem('orderedQuantity'+ product.id)
        return;
    }
    const updatedCartData = cartData.map((p) => {
        if(p.id === product.id) {
          localStorage.setItem('orderedQuantity'+ product.id, p.quantity - 1)
          setQuantity(p.quantity - 1)
          return {
            ...p,
            quantity: p.quantity - 1
          }
        }
        return p
    })
    setProductCount((prev) => prev - 1)
    localStorage.setItem("productsCount", productCount-1)
    setCartData(() => updatedCartData)
    localStorage.setItem("cartData", JSON.stringify(updatedCartData))
  }
  
  function deleteProduct() {
    const cartDataAfterDeletion = cartData.filter((p) => {
      return p.id !== product.id
    })
    setProductCount((prev) => prev - product.quantity)
    localStorage.removeItem('orderedQuantity'+ product.id)
    localStorage.setItem("productsCount", productCount - product.quantity)
    setCartData(cartDataAfterDeletion)
    localStorage.setItem("cartData", JSON.stringify(cartDataAfterDeletion))
  }

  useEffect(() => {
      const orderedQuantity = JSON.parse(localStorage.getItem('orderedQuantity'+ product.id));
      setQuantity(orderedQuantity)
  },[product])

  return (
    <div className='cart-item'>
        <div className='box'>
            <div className='image'>
                <img src={product.imageUrl} alt={product.title}/>
            </div>
            <div className='cart-content'>
                <p>{product.title}
                <span>${(product.price).toFixed(2)}</span>
                </p>
                
            </div>
        </div>

        <div className='add-remove'>
            <div className='btn'
            onClick={handleAddProductCount}
            style={{cursor: product.stockQuantity <= quantity ? "not-allowed": null}}
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