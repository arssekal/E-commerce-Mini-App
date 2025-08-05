import React from 'react'
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
  const {cartData, setCartData, setProductCount, productCount} = useCartData();
  const {setOpen} = useAlert()

  function handleAddToCartCLick() {
    let alreadyAdded = false
    setProductCount((prev) => prev + 1)
    localStorage.setItem("productsCount", productCount+1)
    const updatedCartData = [...cartData].map((p) => {
      if(p.id === product.id) {
        alreadyAdded = true
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
    
    setOpen(() => false)
    setOpen(() => true)
  }

  return (
    <Card className='card'>
      <div className="image-wrapper">
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
         <span style={{display: "block", marginTop: "10px"}}>${product.price}</span>
        </Typography>
        <div className='card-actions'>
          <Link to={"/product/"+product.id}>
            <Button size="small" variant="outlined">View Details</Button>
          </Link>
          <Button size="small" variant="contained" style={{backgroundColor: "#6366F1"}}
          onClick={handleAddToCartCLick}
          >Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard