import React, { createContext, useState, useContext } from 'react'

const AlertContext = createContext({})

export const useAlert = () => {
    return useContext(AlertContext)
}

function AlertProvider({children}) {
 const [open, setOpen] = useState(false);

  return (
    <AlertContext.Provider value={{open, setOpen}}>
        {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider