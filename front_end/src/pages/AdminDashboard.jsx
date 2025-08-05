import React, { useState } from 'react'
import Drawer from '../components/Drawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// css
import '../styling/adminDashboardStyle.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
// products import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useProducts } from '../contexts/AllProducts';
import DialogComp from '../components/DialogComp';
import ConfirmAlert from '../components/ConfirmAlert';
import '../App.css'

function AdminDashboard() {
  const [show, setShow] = useState("products")

  function handleWhatToShow(showThis) {
    alert("its working")
    setShow(showThis)
  }
  
  function whatToShow() {
    if(show === "products") {
      return <Products/>
    }
    if(show === "orders") {
      return <Orders/>
    }
    return <h1>dashboard</h1>

  }
  return (
    <div className='admin-dashboard'>
      <div className='navBar'>
        <Drawer handleWhatToShow={handleWhatToShow}/>
        <div className='user'>
          <AccountCircleIcon className='icon'/>
          <div className='user-info'>
            <h5>Admin User</h5>
            <p>admin@store.com</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className='container'>
        {whatToShow()}
      </div>
    </div>
  )
}

export default AdminDashboard


// products
function Products() { 
  const { allProducts } = useProducts();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: "", description: "", 
    product: {
      title: "",
      description: "",
      price: 0,
      imageUrl: null,   
      imageFile: null,  
      stockQuantity: 0,
    }
  })

  function status(stockQuantity) {
    if(stockQuantity === 0) {
      return "Out Of Stock";
    }
    if(stockQuantity <= 10) {
      return "Low Stock"
    }
    return "In Stock"
  }
  function statusStyle(stockQuantity) {
    if(stockQuantity === 0) {
      return {
        backgroundColor: "rgba(255, 230, 230, 0.863)",
        color: "red",  
        borderColor: "red"
      };
    }
    if(stockQuantity <= 10) {
      return {
        backgroundColor: "#f1eaea",
        color: "#555",  
        borderColor: "#555"
      };
    }
    return {
      backgroundColor: "rgba(219, 255, 165, 0.596)",
      color: "green",  
      borderColor: "green"
    };
  }

  // dialog
  const handleClickOpen = () => {
    setOpen(true);
    setDialogContent(
      {title: "Add Product", description: "Enter the details of the new Product",
        product: {
          title: "",
          description: "",
          price: 0,
          imageUrl: null,
          imageFile: null,
          stockQuantity: 0,
        }
      }
    )
  };
  function handleUpdateProduct(product) {
    setOpen(true);
    setDialogContent(
      {title: "Update Product", description: "Update the details of the Product", product: product}
    )
  }
  // alert confirm deletion
  function handleClickOpenAlert(product) {
    setOpenAlert(true)
    setDialogContent(
      {product: product}
    )
  }
  
  return (
    <>
    <ConfirmAlert openAlert={openAlert} setOpenAlert={setOpenAlert} content={dialogContent}/>
    <DialogComp open={open} setOpen={setOpen} content={dialogContent} />
    <div className='products'>
      <div className='prod-header'>
        <div>
          <h2>Products</h2>
          <p>Manage your product catalog</p>
        </div>
        <Button variant="outlined" startIcon={<AddIcon />}
        onClick={handleClickOpen}
        >
          Add Product 
        </Button>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: "#eee"}}>
            <TableCell>Product title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0, height: 80 } }}
              >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">{row.stockQuantity}</TableCell>
              <TableCell align="right" style={{direction: "rtl"}}>
                <span className='status' style={statusStyle(row.stockQuantity)}>{status(row.stockQuantity)}</span>
              </TableCell>
              <TableCell align="right">
                {row.imageUrl && (
                  <img src={row.imageUrl} alt={row.title} width={80} height={50} style={{backgroundColor: "red"}}/>
                )}
              </TableCell>
              <TableCell align="right">
                <div className='actions'>
                  <DriveFileRenameOutlineIcon className='update' onClick={() => handleUpdateProduct(row)}/>
                  <DeleteOutlineIcon className='delete' onClick={() => handleClickOpenAlert(row)}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </>
  );
}

// orders 
function Orders() {
  return (
    <h1>orders</h1>
  )
}