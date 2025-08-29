import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './contexts/CartContext.jsx';
import AllProductProvider from './contexts/AllProducts.jsx';
import AlertProvider from './contexts/AlertContext.jsx';
import { SnackbarProvider } from 'notistack';
import OrdersProvider from './contexts/OrdersContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AllProductProvider>
      <OrdersProvider>
        {/* cart context provider */}
        <CartProvider> 
          <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            <AlertProvider>
              <App />
            </AlertProvider>
          </SnackbarProvider>
        </CartProvider>
        {/* cart context provider */}
      </OrdersProvider>
    </AllProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
