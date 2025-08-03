import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
// style
import '../styling/homeStyle.css';
// products context
import { useProducts } from '../contexts/AllProducts';

function Home() {
  const { allProducts } = useProducts()
  
  const listProducts =  allProducts.map((prod) => {
    return <ProductCard product={prod} key={prod.id}/>
  })

  return (
    <div className='home'>
        <div className='product-header'>
          <h1>Featured Products</h1>
          <p>Discover our latest collection of amazing products</p>
        </div>
        <div className='products'>
          {listProducts}
        </div>
    </div>
  )
}

export default Home