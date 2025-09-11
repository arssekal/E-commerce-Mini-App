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
// alert
import ConfirmAlert from '../components/ConfirmAlert';


function ProductDetail() {
  const { showAlert } = useAlert()
  const { allProducts } = useProducts()
  const {cartData, setProductCount, setCartData, productCount} = useCartData();  
  const [addedQuantity, setAddedQuantity] = useState(1)
  const [quantity, setQuantity] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  
  
  let { productId } = useParams();
  
  useEffect(() => {
    if(cartData.length === 0 && JSON.parse(localStorage.getItem("cartData")) !== null ) {
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cartData"))
      setCartData(cartDataFromLocalStorage)
    }
  }, [cartData, setCartData])
  
  function handleAddToCartCLick() {
    if(product.stockQuantity <= quantity) {
      setOpenAlert(true)
      return;
    } 
    let alreadyAdded = false
    // changes how many products in the cart
    setProductCount((prev) => prev + addedQuantity)
    localStorage.setItem("productsCount", productCount + addedQuantity)
    
    const updatedCartData = cartData.map((p) => {
      if(p.id === product.id) {
        alreadyAdded = true
        setQuantity(p.quantity + addedQuantity)
        localStorage.setItem('orderedQuantity'+ product.id, p.quantity + addedQuantity)
        return {
          ...p,
          quantity: p.quantity + addedQuantity
        }
      }
      return p
    })
    if(alreadyAdded) {
      setCartData(() => updatedCartData)
      localStorage.setItem("cartData", JSON.stringify(updatedCartData))
    } else {
      setQuantity(addedQuantity)
      localStorage.setItem('orderedQuantity'+ product.id, addedQuantity)
      setCartData((prev) => {
        return [
          ...prev,
          {...product, quantity: addedQuantity}
        ]
      }
      )
      localStorage.setItem("cartData", JSON.stringify([
        ...cartData,
        {...product, quantity: addedQuantity}
      ]))
    }
    showAlert(`${addedQuantity} Product added to cart!`, 'success');
  }

  useEffect(() => {
    const orderedQuantity = JSON.parse(localStorage.getItem('orderedQuantity'+ productId));
    setQuantity(orderedQuantity)
  },[productId])


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

  const titleAndDescription = {
    title: "", 
    description: "You reached the maximum quantity available on stock!!!", 
    action: "understand",
    color: "green"
  }

  return (
    <>
    <ConfirmAlert openAlert={openAlert} setOpenAlert={setOpenAlert}
        titleAndDescription={titleAndDescription}
    />
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
                          if(product.stockQuantity <= quantity) { setOpenAlert(true); return}
                          if(product.stockQuantity > addedQuantity) setAddedQuantity((prev) => prev + 1)
                        }}
                        style={{cursor: product.stockQuantity <= addedQuantity ? "not-allowed": null}}
                        >
                            <AddIcon/>
                        </div>
                        <span>{addedQuantity}</span>
                        <div className='btn'
                        style={{cursor: addedQuantity === 1 ? "not-allowed": "pointer"}}
                        onClick={() => {
                            if(addedQuantity > 1) {
                              setAddedQuantity((prev) => prev - 1)
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
  </>

  )
}

export default ProductDetail