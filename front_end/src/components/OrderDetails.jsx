import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// css
import '../styling/orderDetailsStyle.css'
// icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OrderDetails({open, setOpen, order}) {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Order Details</DialogTitle>
        <DialogContent dividers={'paper'}>
          <div
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            
          >
            <Details order={order}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Details({order}) {
    const total = order.total
    return (
        <div className='order-details'>
            <div className='order-id'>
                <h1>Order ID: {order.id}</h1>
                <p>Placed on <span>{order.orderDate}</span></p>
            </div>   
            <div className='customer-infos'>
                <h2>Customer Information</h2>
                <div className='infos'>
                    <p><AccountBoxIcon className='icon'/>{order.customerName}</p>
                    <p><MailIcon className='icon'/>{order.email}</p>
                    <p><LocalPhoneIcon className='icon'/>{order.phone}</p>
                    <p><LocationOnIcon className='icon'/>{order.address}</p>
                </div>
            </div> 
            <div className='order-items'>
                <h3>Order Items</h3>
                <TableContainer component={Paper} className='order-table'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#eee"}}>
                            <TableCell align="left">Products</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.items.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0, height: 80 } }}
                                    >
                                    <TableCell align="center" style={{display: "flex", gap: "10px"}}>
                                        {/* <div> */}
                                            <img src={item.product.imageUrl} alt={item.product.title} width={80} height={50}/>
                                            <p>{item.product.title}</p>
                                        {/* </div> */}
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">${item.product.price}</TableCell>
                                    <TableCell align="right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>                            
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='order-summmary'>
                <h3>Total</h3>
                <span>${total}</span>
            </div>
        </div>
    );
}
