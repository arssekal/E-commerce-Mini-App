import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// style
import '../styling/orderFailedStyle.css'
import ErrorIcon from '@mui/icons-material/Error';

function OrderFailed() {

  return (
    <div className='order-failed'>
        <div className='failed-msg'>
            <ErrorIcon className='failed-icon'/>
            <h4>Sorry !</h4>
            <p>We have encoutred an error.</p>
            <div>
              <p>Some of your ordered products are out of stock</p>
            </div>
            <div className='go-home-btn'>
              <Link to={'/'}>
                <Button variant="contained" disableElevation
                  style={{width: "100%"}}
                >Go Home</Button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default OrderFailed