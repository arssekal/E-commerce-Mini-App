import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useOrders } from '../contexts/OrdersContext';
import { useState, useEffect } from 'react';
import { markOrdersAsSeen } from '../service/OrderService';



function UnSeenOrders({open, setOpen, handleWhatToShow, setNotificationCount}) {
  const { orders } = useOrders(null);
  const [unSeenOrders, setUnSeenOrders] = useState(null)


  function markUnSeenOrdersAsSeen() {
    handleWhatToShow("orders")
    markOrdersAsSeen()
    setNotificationCount(0)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if(orders === null) return;
    if(orders.length === 0) return;
    
    const unReadOrders = orders.filter((order) => !order.isSeen)

    setUnSeenOrders(unReadOrders)

  }, [orders])

  // you can delete this no worry
  function handleNewOrderClick(order) {
    console.log("======= date =======")
    console.log(order.orderDate)
    let date = new Date()
    console.log(date.toISOString())
    console.log("====================")
  }

  const listOfnewOrders = () => {
    if(unSeenOrders === null) return;
    if(unSeenOrders.length === 0) return;

    return [...unSeenOrders].reverse().map((order) => {
        return (
            <div key={order.id} style={{padding: "10px 20px"}} className='new-order' onClick={() => handleNewOrderClick(order)}>
                <div className='new-order-info'>
                    <div><h4>{order.customerName}</h4><span>ORD-{order.id}</span></div>
                    <span></span>
                </div>
                <div className='new-order-total'>
                    <span>${order.total}</span>
                    <span>2min</span>
                </div>
            </div>
        );
    })

  }


  return (
    <>
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // style={{minWidth: "500px"}}
        >
        <DialogTitle id="scroll-dialog-title" style={{borderBottom: "1px solid #555", marginBottom: "2px"}}>New Orders</DialogTitle>
        <div dividers={scroll === 'paper'}>
            <div
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            >
              {listOfnewOrders()}
            </div>
        </div>
        <DialogActions style={{borderTop: "1px solid #555", marginTop: "2px"}}>
            <Button onClick={() => {
              handleClose()
              markUnSeenOrdersAsSeen()
            }}>View All Orders</Button>
        </DialogActions>
        </Dialog>
    </>
  )
}

export default UnSeenOrders