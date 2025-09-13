import React, { useEffect, useMemo, useState } from 'react'
// material ui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// style
import '../styling/productCardStyle.css'
import { Link } from 'react-router-dom';
// context
import { useCartData } from '../contexts/CartContext';
import { useAlert } from '../contexts/AlertContext'

function ProductCard({product}) {
  const { cartData, setCartData, setProductCount, productCount } = useCartData();
  const [quantity, setQuantity] = useState(0);
  // const [btn, setBtn] = useState({btnContent: "", btnStyle: ""})
  const { showAlert } = useAlert()
  
  function handleAddToCartCLick() {
    let alreadyAdded = false


    setProductCount((prev) => prev + 1)
    localStorage.setItem("productsCount", productCount+1)
    
    const updatedCartData = [...cartData].map((p) => {
      if(p.id === product.id) {
        alreadyAdded = true
        // test
        if(product.stockQuantity <= p.quantity) {
          setProductCount((prev) => prev - 1)
          localStorage.setItem("productsCount", productCount-1)
          alert("out of stock")
        }
        setQuantity(p.quantity + 1)
        localStorage.setItem('orderedQuantity'+ product.id, p.quantity + 1)
        return {
          ...p,
          quantity: p.quantity + 1
        }
      }
      return p
    })
    if(alreadyAdded) {
      setCartData(() => updatedCartData)
      localStorage.setItem("cartData", JSON.stringify(updatedCartData))
    } else {
      setQuantity(1)
      localStorage.setItem('orderedQuantity'+ product.id, 1)
      setCartData((prev) => {
        return [
          ...prev,
          {...product, quantity: 1}
        ]
      }
    )
    localStorage.setItem("cartData", JSON.stringify(
      [
        ...cartData,
        {...product, quantity: 1}
      ]
    ))
    }
    console.log("product: "+ product.oldPrice)

    showAlert('Product added to cart!', 'success');
  }

  useEffect(() => {
    const orderedQuantity = JSON.parse(localStorage.getItem('orderedQuantity'+ product.id));
    setQuantity(orderedQuantity)
  },[product])

  const  [btnContent, btnStyle] = useMemo(() => {
      if(product.stockQuantity <= quantity || product.stockQuantity === 0) {
        return [
         "Out Of Stock",
          {
            backgroundColor: "red",
            color: "white"
          }
        ]
      }
      return [
        "Add To Cart",
        {
          backgroundColor: "#6366F1",
          color: "white"
        }
      ]
  }, [quantity, product.stockQuantity]) 


  return (
    <Card className='card'>
      <div className="image-wrapper">
        { (btnContent === 'Add To Cart' && quantity > 0) && <div><span>{quantity}</span></div>}
        <CardMedia
          className='image-item'
          component="img"
          alt={product.title}
          height="140"
          image={product.imageUrl}
        />
      </div>

      <CardContent className='card-content'>
        <Typography gutterBottom variant="h5" component="div">
         {product.title}
         <div style={{display: "block", marginTop: "10px"}}><span className='prod-price'>${product.price}</span> <span className='old-price'>{"$"+product.oldPrice || null}</span></div>
        </Typography>
        <div className='card-actions'>
          <Link to={"/product/"+product.id}>
            <Button size="small" variant="outlined">View Details</Button>
          </Link>
          <div className='add-to-cart'>
            <Button size="small" variant="contained" 
            style={btnStyle}
            disabled={btnContent === 'Out Of Stock'}
            onClick={handleAddToCartCLick}
            >{btnContent}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard