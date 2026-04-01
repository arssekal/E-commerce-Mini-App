// MainLayout.jsx
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import OrderFailed from '../pages/OrderFailed';
import { useState } from 'react';

function MainLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='container'>
      <NavBar onSearchChange={setSearchTerm} />
      <Routes>
        <Route path='/' element={<Home searchTerm={searchTerm} />} />
        <Route path='/home' element={<Home searchTerm={searchTerm} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success' element={<OrderSuccess />} />
        <Route path='/order-failed' element={<OrderFailed/>} />
      </Routes>
    </div>
  );
}

export default MainLayout;
