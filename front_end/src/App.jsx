import './App.css'
import CartItem from './components/CartItem'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'

function App() {

  return (
    <div className='app'>
      <div className='container'>
        {/* <NavBar/> */}
        {/* <ProductCard/> */}
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <h1 style={{marginTop: "100px", color: "black"}}>hello</h1>

      </div>
    </div>
  )
}

export default App
