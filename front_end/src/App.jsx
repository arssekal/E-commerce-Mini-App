import './App.css';
import CartItem from './components/CartItem'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div className='app'>
      <div className='container'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<CartItem/>}/>
          <Route path='/checkout' element={<Home/>}/>
          <Route path='/order-success' element={<h1>order succes</h1>}/>
        </Routes>
        <Home/>
      </div>
    </div>
  )
}

export default App
