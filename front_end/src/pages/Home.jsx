import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
// style
import '../styling/homeStyle.css';
// products context
import AllProductProvider, { useProducts } from '../contexts/AllProducts';
// 
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function valuetext(value) {
  return `$${value}`;
}

function Home() {
  const { allProducts } = useProducts()
  const [minmaxPrice, setMinmaxPrice] = useState({minPrice: 1_000_000_000, maxPrice: 0})
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [value, setValue] = useState([0, 0]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilter, setShowFilter] = useState("show")
  const [showNumberOfFiltred, setShowNumberOfFiltered] = useState(false)


  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    // calcul local pour éviter d'appeler setState dans la boucle
    let min = Number(allProducts[0].price) || 0;
    let max = Number(allProducts[0].price) || 0;

    allProducts.forEach((prod) => {
      const price = Number(prod.price) || 0;
      if (price < min) min = price;
      if (price > max) max = price;
    });

    setMinmaxPrice({ minPrice: min, maxPrice: max });
    setValue([min, max]);
    setFilteredProducts((prev) => prev.length === 0 ? allProducts : prev);
  }, [allProducts]);


  const listProducts = useMemo(() => {
    if(!filteredProducts) return <h1>no products with those filters</h1>
    return filteredProducts.map((prod) => (
      <ProductCard product={prod} key={prod.id} />
    ))
  }, [filteredProducts]);

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

  
  const handlePriceRangeChange = (event, newValue) => {
    setValue(newValue);
  };

  function applyFilter() {
    const filtered = allProducts.filter((prod) => {
      const price = Number(prod.price) || 0;
      const inPrice = price >= value[0] && price <= value[1];

      const prodCat = (prod.category || "").toString().toLowerCase();
      const filterCat = (categoryFilter || "all").toString().toLowerCase();

      const matchesCategory = filterCat === "all" || prodCat === filterCat;

      return inPrice && matchesCategory;
    });

    setShowNumberOfFiltered(true)
    setFilteredProducts(filtered);
  }

  function clearFilter() {
    setValue([minmaxPrice.minPrice, minmaxPrice.maxPrice])
    setCategoryFilter("all")
    setFilteredProducts(allProducts)
    setShowNumberOfFiltered(false)
  }

  
  return (
    <div className='home'>
        {
          showFilter === "hide" &&
          <div className="filter-icon" onClick={() => setShowFilter("show")}>
            <FilterAltIcon/>
          </div>
        }

        <div className='hero'>
          <HeroSection/>
        </div>
          <div className={`home-content ${showFilter === "show" ? "with-filter" : "full-width"}`}  
            id='products'
          >
          {
            showFilter === "show" &&
            <div className="filter-products">
                  <div className='filter-header'>
                        <h3>Filter</h3>
                        <div>
                          <Button variant="contained" onClick={clearFilter}>Clear</Button>
                          <VisibilityOffIcon className='hide' onClick={() => setShowFilter("hide")}/>
                        </div>
                  </div>
                  <div className="price-range">
                        <div>
                            <p>
                            Price Range from <span>${value[0] === 1_000_000_000 ? 0: value[0]}</span> to <span>${value[1]}</span>
                            </p>
                            <Slider
                              getAriaLabel={() => 'Temperature range'}
                              value={value}
                              onChange={handlePriceRangeChange}
                              valueLabelDisplay="auto"
                              getAriaValueText={valuetext}
                              min={minmaxPrice.minPrice}
                              max={minmaxPrice.maxPrice}
                            />
                        </div>
                  </div>
                  <FormControl fullWidth style={{margin: "20px 0"}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={categoryFilter}
                          label="Age"
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          MenuProps={{
                            disableScrollLock: true,   // empêche le scroll jump
                          }}
                        >
                          {["all", "Clothes", "Electronics", "Sport and Fitness"].map((item) => {
                            return (
                              <MenuItem value={item.toLowerCase()}>{item}</MenuItem>
                            );
                          })}
                        </Select>
                  </FormControl>
                  <Button variant="contained" fullWidth onClick={applyFilter}>Apply</Button>
                  {
                    showNumberOfFiltred &&
                    <div style={{
                          marginTop: "15px", 
                          color: "green", 
                          border: "1px solid green", 
                          textAlign: "center", 
                          padding: "10px",
                          borderRadius: "5px",
                          fontSize: "18px",
                        }}
                      >{filteredProducts.length} products</div>
                  }
            </div>
          }
          {/* products */}
          <div className='products'>
            {listProducts}
          </div>
        </div>
        {/* footer */}
        <div className="footer">
            <div className='stay-updated'>
              <div>
                <h2>Stay updated with our latest deals</h2>
                <p>Get exclusive offers and be the first to know about new arrivals</p>
                <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your email"
                  sx={{
                    input: { color: "white" }, 
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray", 
                      opacity: 1,    
                    },
                    backgroundColor: "#353f4f",
                    borderRadius: "7px"
                  }}
                />
                  <Button variant="contained">Subscribe</Button>
                </div>
              </div>
            </div>
            <div className="infos">
              <div className="box">

              </div>
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
