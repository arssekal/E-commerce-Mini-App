import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// context
import { useAlert } from '../contexts/AlertContext'

export default function SnackBar() {
  const {open, setOpen} = useAlert()
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Added to Your Cart
        </Alert>
      </Snackbar>
    </div>
  );
}
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Slide from '@mui/material/Slide';
// import Grow from '@mui/material/Grow';
// import { useAlert } from '../contexts/AlertContext'

// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }

// function GrowTransition(props) {
//   return <Grow {...props} />;
// }

// export default function SnackBar() {
//   const {open, setOpen} = useAlert()
//   const [state, setState] = React.useState({
//     Transition: Slide,
//   });

//   const handleClick = (Transition) => () => {
//     setState({
//       Transition,
//     });
//     setOpen(true)
//   };

//   const handleClose = () => {
//     setOpen(false)
//   };

//   return (
//     <div>
//       <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
//       <Snackbar
//         open={open}
//         onClose={handleClose}
//         slots={{ transition: state.Transition }}
//         message="I love snacks"
//         key={state.Transition.name}
//         autoHideDuration={1200}
//       />
//     </div>
//   );
// }
