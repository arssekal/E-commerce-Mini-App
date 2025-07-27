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

function ProductCard() {
  return (
    <Card className='card'>
      <div className="image-wrapper">
        <CardMedia
          className='image-item'
          component="img"
          alt="green iguana"
          height="140"
          image="/images/image1.jpg"
        />
      </div>

      <CardContent className='card-content'>
        <Typography gutterBottom variant="h5" component="div">
          Wireless Bluetooth Headphones
        </Typography>
        <span>$79.99</span>
        <div className='card-actions'>
          <Button size="small" variant="outlined">View Details</Button>
          <Button size="small" variant="contained" style={{backgroundColor: "#6366F1"}}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard