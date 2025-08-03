import './App.css';
import NavBar from './components/NavBar'
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Snackbar from './components/SnackBar';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <div className='app'>
      <div className='container'>
        <AdminDashboard/>
      {/* <Snackbar isOpen={true}/>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:productId' element={<ProductDetail/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/order-success' element={<OrderSuccess/>}/>
        </Routes> */}
      </div>
    </div>
  )
}

export default App
