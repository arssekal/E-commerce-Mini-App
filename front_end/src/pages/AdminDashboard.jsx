import React from 'react'
import Drawer from '../components/Drawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// css
import '../styling/adminDashboardStyle.css'

function AdminDashboard() {
  return (
    <div>
      <div className='navBar'>
        <Drawer/>
        <div className='user'>
          <AccountCircleIcon className='icon'/>
          <div>
            <h5>Admin User</h5>
            <p>admin@store.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard