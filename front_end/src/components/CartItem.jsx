import React from 'react'
// materila ui
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// style
import '../styling/cartItemStyle.css'

function CartItem() {
  return (
    <div className='cart-item'>
        <div className='box'>
            <div className='image'>
                <img src="/images/image4.jpg" alt="" />
            </div>
            <div className='cart-content'>
                <p>Wireless Bluetooth Headphones</p>
                <span>$79.99</span>
            </div>
        </div>

        <div className='add-remove'>
            <div className='btn'>
                <AddIcon/>
            </div>
            <span>2</span>
            <div className='btn'>
                <RemoveIcon/>
            </div>
            <div className='btn delete'>
                <DeleteOutlineIcon/>
            </div>
        </div>
    </div>
  )
}

export default CartItem