import React, { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

const AlertContext = createContext({});

export const useAlert = () => useContext(AlertContext);

function AlertProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (message, variant = 'success') => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
