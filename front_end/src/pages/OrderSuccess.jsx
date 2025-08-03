import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Button from '@mui/material/Button';
// style
import '../styling/orderSuccessStyle.css'
import { Link } from 'react-router-dom';

function OrderSuccess() {
  function generateOrderNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '#';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  return (
    <div className='order-success'>
        <div className='success-msg'>
            <CheckCircleOutlineOutlinedIcon className='success-icon'/>
            <h4>Thank You!</h4>
            <p>Your order has been placed successfully.</p>
            <div>
                <h5>Order Number</h5>
                <span>{generateOrderNumber()}</span>
            </div>
            <p>We'll send you a confirmation email with tracking details soon.</p>
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

export default OrderSuccess