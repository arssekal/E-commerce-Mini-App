import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function ConfirmAlert({openAlert, setOpenAlert, content, titleAndDescription}) {
  const handleClose = () => {
    setOpenAlert(false);
  };

  function handleDeletionConfirm() {
    if(titleAndDescription.action === "delete") {
      axios.delete("http://localhost:8080/api/products/"+ content.product.id)
      .then(() => {
          console.log("product with id "+ content.product.id +" is deleted")
          setOpenAlert(false)
      })
      .catch((error) => console.log("errot => "+ error))
    }
    else setOpenAlert(false)
  }
  

  return (
    <div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"Are you sure you want to delete this Product?"} */}
          {titleAndDescription.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* After deletion there is no going back it will be removed for ever  */}
            {titleAndDescription.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeletionConfirm}  style={{color: titleAndDescription.color}}>
            {/* Delete */}
            {titleAndDescription.action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmAlert