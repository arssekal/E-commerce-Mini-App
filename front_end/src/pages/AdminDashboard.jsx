import React, { useEffect, useMemo, useState } from 'react'
import Drawer from '../components/Drawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// css
import '../styling/adminDashboardStyle.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
// dashboars
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SportsIcon from '@mui/icons-material/Sports';
import Slider from '@mui/material/Slider';
import { motion } from "motion/react"
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
// orders import
import { styled } from '@mui/material/styles';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { listOrders, updateOrderStatus } from '../service/OrderService';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import OrderDetails from '../components/OrderDetails';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
    // menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // pending
import CropRotateIcon from '@mui/icons-material/CropRotate'; // processing
import DoneAllIcon from '@mui/icons-material/DoneAll'; // delivered


function AdminDashboard() {
  const [show, setShow] = useState("dashboard")

  function handleWhatToShow(showThis) {
    setShow(showThis)
    console.log("what to show is: "+ showThis)
  }
  
  function whatToShow() {
    if(show === "products") {
      return <Products/>
    }
    if(show === "orders") {
      return <Orders/>
    }
    return <Dashboard />

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
            
      <div className='container'>
       {whatToShow()}
      </div>
    </div>
  )
}

export default AdminDashboard


// ===================== dashboard =======================
function Dashboard() {
  const [orders, setOrders] = useState(null)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [stock, setStock] = useState({inStock: 0, lowStock: 0, outOfStock: 0})
  const { allProducts } = useProducts();
  
  useEffect(() => {
    listOrders().then((responce) => {
      setOrders(responce.data)
    })
    .catch((err) => console.log(err))
  }, [setOrders])

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;
    let inStock = 0, lowStock = 0, outOfStock = 0
    let total = 0
    allProducts.map((prod) => {
      if(prod.stockQuantity === 0) outOfStock += 1
      else if(prod.stockQuantity <= 10) lowStock += 1
      else inStock += 1
      total += 1
    });
    setStock({inStock, lowStock, outOfStock})
    setTotalProducts(total);
  }, [allProducts]);

  useEffect(() => {
    if(!orders || orders.length === 0) return;

    const date = new Date(); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;

    let totalRevenue = 0;
    orders.forEach(order => {
      if(formatted.substring(0,7) === order.orderDate.substring(0,7)) {
        totalRevenue += order.total
      }
    });
    setTotalRevenue(totalRevenue)
  }, [orders])



  if (!orders || orders.length === 0) {
    return (
      <div className='dashboard'>
        <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
            Loading recent orders <CircularProgress />
          </p>
        </div>
      </div>
    );
  }
  if (!allProducts || allProducts.length === 0) {
    return (
      <div className='dashboard'>
        <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
            Loading  <CircularProgress />
          </p>
        </div>
      </div>
    );
  }

  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  let count = 1;
  const tenRecentOrders = [...orders].reverse().map((row) => {
    if(count <= 5) {
      count += 1;
      return (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0, height: 80 } }}
          >
          <TableCell component="th" scope="row">{row.id}</TableCell>
          <TableCell align="center">{row.customerName}</TableCell>
          <TableCell align="right">${row.total}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
        </TableRow>
      )
    } 
  })

  function revenueThisMonth() {
    const date = new Date(); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    console.log(formatted.substring(0,7))
    console.log(formatted.substring(0,7) === orders[0].orderDate.substring(0,7))

    let totalRevenue = 0;
    for(const order of orders) {
      if(formatted.substring(0,7) === order.orderDate.substring(0,7)) {
        totalRevenue += order.total
      }
    }
    return totalRevenue
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your e-commerce store performance</p>
        </div>
      </div>

      <div className='dashboard-overview'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 * 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <DemoPaper variant="outlined" className='card-dashboard'>
            <div className='info'>
              <p>Total Products</p>
              <span>{totalProducts || 0}</span>
            </div>
            <div className='icon'>
              <ArticleOutlinedIcon />
            </div>
          </DemoPaper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 * 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <DemoPaper variant="outlined" className='card-dashboard'>
            <div className='info'>
              <p>Total Orders</p>
              <span>{orders.length || 0}</span>
            </div>
            <div className='icon'>
              <LocalMallIcon />
            </div>
          </DemoPaper>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <DemoPaper variant="outlined" className='card-dashboard' onClick={revenueThisMonth}>
            <div className='info'>
              <p>Revenue This Month</p>
              <span>${totalRevenue}</span>
            </div>
            <div className='icon'>
              <AttachMoneyIcon />
            </div>
          </DemoPaper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 * 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <DemoPaper variant="outlined" className='card-dashboard'>
            <div className='info'>
              <p>Out of Stock</p>
              <span>{stock.outOfStock}</span>
            </div>
            <div className='icon'>
              <SportsIcon />
            </div>
          </DemoPaper>
        </motion.div>
      </div>
      <div className='overview'>
        <TableContainer component={Paper} className='order-table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor: "#eee"}}>
                <TableCell>Recent Orders</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">View All Orders</TableCell>
              </TableRow>
              <TableRow>
                <TableCell >Order Id</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenRecentOrders}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="inventory-overview">
          <h3>Products Overview</h3>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p>
                In Stock <span>{Math.floor((stock.inStock * 100) / totalProducts)}%</span>
              </p>
              <span>{stock.inStock}</span>
            </div>
            <Slider
              defaultValue={70}
              value={Math.floor((stock.inStock * 100) / totalProducts)}
              aria-label="Disabled slider"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p>
                Low Stock <span>{Math.round((stock.lowStock * 100) / totalProducts)}%</span>
              </p>
              <span>{stock.lowStock}</span>
            </div>
            <Slider
              defaultValue={35}
              value={Math.round((stock.lowStock * 100) / totalProducts)}
              aria-label="Disabled slider"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <p>
              Out of Stock <span>{Math.round((stock.outOfStock * 100) / totalProducts)}%</span>
              </p>
              <span>{stock.outOfStock}</span>
            </div>
            <Slider
              defaultValue={10}
              value={Math.floor((stock.outOfStock * 100) / totalProducts)}
              aria-label="Disabled slider"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ===================== products =======================
function Products() { 
  const { allProducts } = useProducts();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: "", description: "", 
    product: {
      title: "",
      description: "",
      price: 0,
      // change
      oldPrice: 0,
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

  if (!allProducts || allProducts.length === 0) {
    return (
      <div className='product-details'>
        <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
          <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
            Loading Products <CircularProgress />
          </p>
        </div>
      </div>
    );
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
                  <img src={row.imageUrl} alt={row.title} width={80} height={50}/>
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

// ===================== orders =======================
function Orders() {
  const [orders, setOrders] = useState(null)
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null)
  // const [statusCount, setStatusCount] = useState({pending: 0, processing: 0})
  // from menu
  const [anchorEl, setAnchorEl] = useState(null);
  
  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  useEffect(() => {
    listOrders().then((responce) => {
      setOrders(responce.data)
    })
    .catch((err) => console.log(err))
  }, [])

  const [pending, processing, delivered] = useMemo(() => {
    let pending = 0, processing = 0, delivered = 0;
    if (orders) {
      for (let order of orders) {
        if (order.status === "Pending") pending++;
        else if (order.status === "Processing") processing++;
        else if (order.status === "Delivered") delivered++;
      }
    }
    return [pending, processing, delivered];
  }, [orders]);

  if (!orders || orders.length === 0) {
    return (
      <div className='product-details'>
        <div style={{ textAlign: "center", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
          <p style={{display: "flex", alignItems: "center", gap: "10px"}}>
            Loading orders details<CircularProgress />
          </p>
        </div>
      </div>
    );
  }
  
  function viewOrderDetails(row) {
    // alert("details")
    setOpen(true)
    setOrder(row)
    console.log(row)
  }


  // menu more
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleUpdateStatusCLick(row) {
    setOrder(row)
  }
  function handleStatusCLick(status) {
    updateOrderStatus(order.id, status)
    .then((response) => {
      setOrders(prevOrders =>
        prevOrders.map(o =>
            o.id === order.id ? response.data : o
        )
    );
    })
    .catch((error) => console.error(error))
  }

  function statusStyle(status) {
    if(status === "Pending") {
      return {
        backgroundColor: "#5090f7"
      }
    }
    if(status === "Processing") {
      return {
        backgroundColor: "#fa8c3d"
      }
    }
    return  {
      backgroundColor: "#38fd80"
    }
  }

  return (
    <>
    <OrderDetails open={open} setOpen={setOpen} order={order}/>
    <div className='orders'>
      <div className='order-header'>
        <div>
          <h2>Orders</h2>
          <p>View and manage customer orders</p>
        </div>
      </div>

      {/* <div className='orders-overview'>
        <DemoPaper variant="outlined" className='card-order'>
          <div className='info'>
            <p>Total Orders</p>
            <span>{orders.length || 0}</span>
          </div>
          <div className='icon'>
            <ArticleOutlinedIcon />
          </div>
        </DemoPaper>

        <DemoPaper variant="outlined" className='card-order'>
          <div className='info'>
            <p>Pending</p>
            <span>{pending}</span>
          </div>
          <div className='icon'>
            <ArticleOutlinedIcon />
          </div>
        </DemoPaper>
        
        <DemoPaper variant="outlined" className='card-order'>
          <div className='info'>
            <p>Processing</p>
            <span>{processing}</span>
          </div>
          <div className='icon'>
            <ArticleOutlinedIcon />
          </div>
        </DemoPaper>

        <DemoPaper variant="outlined" className='card-order'>
          <div className='info'>
            <p>Delivered</p>
            <span>{delivered}</span>
          </div>
          <div className='icon'>
            <ArticleOutlinedIcon />
          </div>
        </DemoPaper>
      </div> */}

      <OrdersOverview orders={orders} pending={pending} processing={processing} delivered={delivered}/>


      <TableContainer component={Paper} className='order-table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor: "#eee"}}>
              <TableCell>Order Id</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...orders].reverse().map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0, height: 80 } }}
                >
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="center">{row.customerName}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
                <TableCell align="right">{row.items.length}</TableCell>
                <TableCell align="right">${row.total}</TableCell>
                <TableCell align="right" className='status-cell'><span className='status' style={statusStyle(row.status)}>{row.status}</span></TableCell>
                <TableCell align="center">
                  <div className='actions'>
                    <MoreHorizIcon className='more' onClick={(e) => {
                      handleClick(e)
                      handleUpdateStatusCLick(row)
                    }}/>
                    <RemoveRedEyeOutlinedIcon className='view' onClick={() => viewOrderDetails(row)}/>
                    <FileDownloadOutlinedIcon className='download' />
                  </div>
                  <Menu
                    className="menu"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        sx: {
                          boxShadow: "none", 
                          border: "1px solid #e0e0e0",                
                          borderRadius: "10px",                       
                          minWidth: "140px",                          
                          padding: "0",                        
                          backgroundColor: "#fff", 
                        },
                      },
                      list: {
                        'aria-labelledby': 'basic-button',
                        sx: {
                          padding: 0, 
                        },
                      },
                    }}
                  >

                    <MenuItem onClick={(e) => {handleClose(e); handleStatusCLick("Pending")}} className='menu-item'><PendingActionsIcon className='icon'/>Pending</MenuItem>
                    <MenuItem onClick={(e) => {handleClose(e); handleStatusCLick("Processing")}} className='menu-item'><CropRotateIcon className='icon'/>Processing</MenuItem>
                    <MenuItem onClick={(e) => {handleClose(e); handleStatusCLick("Delivered")}} className='menu-item'><DoneAllIcon className='icon'/>Delivered</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
    </>
  )
}



// helper for number counting animation
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMilSecDur = 1000;
    let incrementTime = 20;
    let step = Math.ceil((end - start) / (totalMilSecDur / incrementTime));

    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

function OrdersOverview({ orders, pending, processing, delivered }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const items = [
    { label: "Total Orders", value: orders.length || 0 },
    { label: "Pending", value: pending },
    { label: "Processing", value: processing },
    { label: "Delivered", value: delivered },
  ];

  return (
    <div className="orders-overview">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="card-order"
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="info">
            <p>{item.label}</p>
            <Counter target={item.value} />
          </div>
          <div className="icon">
            <ArticleOutlinedIcon />
          </div>
        </motion.div>
      ))}
    </div>
  );
}