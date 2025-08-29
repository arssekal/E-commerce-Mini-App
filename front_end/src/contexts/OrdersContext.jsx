import { createContext, useState, useEffect, useContext } from "react";
import { listOrders } from '../service/OrderService';


const OrdersContext = createContext({})

export const useOrders = () => {
    return useContext(OrdersContext);
}

export default function OrdersProvider({children}) {
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        listOrders().then((responce) => {
          setOrders(responce.data)
        })
        .catch((err) => console.log(err))
    }, [])
    return (
        <OrdersContext.Provider value={{orders, setOrders}}>
            {children}
        </OrdersContext.Provider>
    )
}