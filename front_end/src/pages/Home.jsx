import React from 'react'
import ProductCard from '../components/ProductCard'
// style
import '../styling/homeStyle.css';
// products context
import { useProducts } from '../contexts/AllProducts';
// 
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const { allProducts } = useProducts()

  if (!allProducts || allProducts.length === 0) {
    return (
      <div className='home'>
          <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
              Loading Products<CircularProgress />
            </p>
          </div>
        </div>
      );
    }
  
  const listProducts =  allProducts.map((prod) => {
    return <ProductCard product={prod} key={prod.id}/>
  })
  
  return (
    <div className='home'>
        <div className='hero'>
          <HeroSection/>
        </div>

        <div className='home-content' id='products'>
          {/* <div className='product-header'>
            <h1>Featured Products</h1>
            <p>Discover our latest collection of amazing products</p>
          </div> */}
          <div className='products'>
            {listProducts}
          </div>
        </div>
    </div>
  )
}

export default Home

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HeroSection = () => {
  return (
    <div  className='hero-section'  style={{
      width: "100vw",       // full width
      height: "100%",       // take height of parent (100vh)
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom, #1e3c72, #2a5298)",
      color: "white",
      textAlign: "center",
      padding: "0 20px"
    }}>
      <DotLottieReact
        src="https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
      <h1>Welcome to Our Store</h1>
      <p>Discover the best products selected for you</p>
      <a href="#products">
        <button style={{
          padding: "12px 24px",
          backgroundColor: "#ff6600",
          color: "#fff",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "1rem"
        }}>Shop Now</button>
      </a>
    </div>
  );
};
