import React, { useEffect, useState } from 'react'
// style
import '../styling/productDetailStyle.css'
// materila ui
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useParams } from 'react-router-dom';
// icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// context
import { useCartData } from '../contexts/CartContext';
import { useProducts } from '../contexts/AllProducts';
import { useAlert } from '../contexts/AlertContext'
//
import CircularProgress from '@mui/material/CircularProgress';

function ProductDetail() {
  const {setOpen} = useAlert()
  const { allProducts } = useProducts()
  const {cartData, setProductCount, setCartData, productCount} = useCartData();  
  const [quantity, setQuantity] = useState(1)
  let { productId } = useParams();


  
  // let product = useMemo(() => {
  //   for(const prod of allProducts) {
  //     if(prod.id === Number(productId)) {
  //       console.log("image url: "+prod.imageUrl)
  //       return prod;
  //     }
  //   }
  //   return null
  // }, [productId, allProducts])

  useEffect(() => {
    if(cartData.length === 0 && JSON.parse(localStorage.getItem("cartData")) !== null ) {
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cartData"))
      setCartData(cartDataFromLocalStorage)
    }
  }, [cartData, setCartData])

  function handleAddToCartCLick() {
    let alreadyAdded = false

    // changes how many products in the cart
    setProductCount((prev) => prev + quantity)
    localStorage.setItem("productsCount", productCount+quantity)

    const updatedCartData = cartData.map((p) => {
      if(p.id === product.id) {
        alreadyAdded = true
        return {
          ...p,
          quantity: p.quantity + quantity
        }
      }
      return p
    })
    if(alreadyAdded) {
      setCartData(() => updatedCartData)
      localStorage.setItem("cartData", JSON.stringify(updatedCartData))
    } else {
      setCartData((prev) => {
        return [
          ...prev,
          {...product, quantity: quantity}
        ]
      }
      )
      localStorage.setItem("cartData", JSON.stringify([
        ...cartData,
        {...product, quantity: quantity}
      ]))
    }
    setOpen(true)
  }

  if (!allProducts || allProducts.length === 0) {
    return (
      <div className='product-details'>
        <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
          Loading product details<CircularProgress />
          </p>
        </div>
      </div>
    );
  }

  const product = allProducts.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className='product-details'>
        <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>Product not found.</p>
      </div>
    );
  }


  return (
    <div className='product-details'>
        <div>
            <Link to={"/"} className='return-home'>
                <KeyboardBackspaceIcon/>
                <h5>Back to Products</h5>
            </Link>
        </div>
        <div className='content'>
            <div className='image'>
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className='details'>
                <h2>{product.title}</h2>
                <span className='price'>${product.price}</span>
                <p>{product.description}</p>
                <div className='quantity'>
                    <h5>Quantity</h5>
                    <div className='add-remove'>
                        <div className='btn'
                        onClick={() => {
                            setQuantity((prev) => prev + 1)
                        }}
                        >
                            <AddIcon/>
                        </div>
                        <span>{quantity}</span>
                        <div className='btn'
                        style={{cursor: quantity === 1 ? "not-allowed": "pointer"}}
                        onClick={() => {
                            if(quantity > 1) {
                                setQuantity((prev) => prev - 1)
                            }
                        }}
                        >
                            <RemoveIcon/>
                        </div>
                    </div>
                    <Button variant="contained" disableElevation
                    style={{width: "100%"}}
                    onClick={handleAddToCartCLick}
                    >
                      Add to cart ${product.price}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail