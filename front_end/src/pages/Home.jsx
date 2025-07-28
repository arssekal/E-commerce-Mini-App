import React from 'react'
import ProductCard from '../components/ProductCard'
// style
import '../styling/homeStyle.css';

function Home() {
  return (
    <div className='home'>
        <div className='product-header'>
          <h1>Featured Products</h1>
          <p>Discover our latest collection of amazing products</p>
        </div>
        <div className='products'>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
    </div>
  )
}

export default Home