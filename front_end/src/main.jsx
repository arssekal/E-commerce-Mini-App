import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext.jsx';
import AllProductProvider from './contexts/AllProducts.jsx';
import AlertProvider from './contexts/AlertContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AllProductProvider>
      {/* cart context provider */}
      <CartProvider> 
        <AlertProvider>
          <App />
        </AlertProvider>
      </CartProvider>
      {/* cart context provider */}
    </AllProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
