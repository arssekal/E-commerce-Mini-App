import React, { useEffect } from 'react'
// duailog add product
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function DialogComp({open, setOpen, content}) {
    const [product, setProduct] = useState({});

    useEffect(() => {
      setProduct({
        title: content.product.title || "",
        description: content.product.description || "",
        price: content.product.price || null,
        category: content.product.category || "all",
        // change
        oldPrice: content.product.oldPrice || null,
        imageUrl: content.product.imageUrl || null,
        imageFile: null,
        stockQuantity: content.product.stockQuantity || 0,
        id: content.product.id || null
      });
    }, [content]);
    
    const handleClose = () => {
      setOpen(false);
    };
  
    // change
    const handleAddUpdateProduct = async (e) => {
      e.preventDefault();

      if(product.price < 0) {
        return
      }
      if(product.oldPrice < 0) {
        return
      }
    
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      // change
      formData.append("oldPrice", product.oldPrice);
      formData.append("stockQuantity", product.stockQuantity);
      formData.append("image", product.imageFile); // file input
      formData.append("id", product.id); 


      if(content.title === "Add Product") {
        try {
          await axios.post("http://localhost:8080/api/products/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setOpen(false);
        } catch (err) {
          console.error("Error adding product", err);
        }
      } else {
        console.log(content.product.id)
        try {
          await axios.put("http://localhost:8080/api/products/" + content.product.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setOpen(false);
        } catch (err) {
          console.error("Error updating product", err);
        }
      }
    
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{minWidth: "500px"}} disableScrollLock>
        <DialogTitle>{content.title}</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            {content.description}
          </DialogContentText>
          <form onSubmit={handleAddUpdateProduct}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="title"
              fullWidth
              variant="standard"
              value={product.title}
              onChange={(e) => {
                setProduct({...product, title: e.target.value})
              }}
            />
            <TextField
              required
              margin="dense"
              label="description"
              fullWidth
              variant="standard"
              value={product.description}
              onChange={(e) => {
                setProduct({...product, description: e.target.value})
              }}
            />
            <FormControl fullWidth style={{margin: "20px 0"}}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.category}
                label="Age"
                onChange={(e) => setProduct({...product, category: e.target.value})}
                MenuProps={{
                  disableScrollLock: true,   // empêche le scroll jump
                }}
              >
                {["all", "Clothes", "Electronics", "Sport and Fitness"].map((item) => {
                  return (
                    <MenuItem value={item.toLowerCase()}>{item}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              required
              margin="dense"
              label="price ($)"
              type='number'
              fullWidth
              variant="standard"
              value={product.price}
              onChange={(e) => {
                setProduct({...product, price: Number(e.target.value)})
              }}
            />
            {/* change */}
            <TextField
              required
              margin="dense"
              label="old price ($)"
              type='number'
              fullWidth
              variant="standard"
              value={product.oldPrice}
              onChange={(e) => {
                setProduct({...product, oldPrice: Number(e.target.value)})
              }}
            />
            <TextField
              required
              margin="dense"
              label="stock quantity"
              type='number'
              fullWidth
              variant="standard"
              value={product.stockQuantity}
              onChange={(e) => {
                setProduct({...product, stockQuantity: Number(e.target.value)})
              }}
            />
            {/* change */}
            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) =>{
                const file = e.target.files[0];
                setProduct({ ...product, imageFile: file });

                // Optional preview
                const previewUrl = URL.createObjectURL(file);
                setProduct(prev => ({ ...prev, imageUrl: previewUrl }));

                console.log(previewUrl)
              }
              }
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Finich</Button>
            </DialogActions>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default DialogComp