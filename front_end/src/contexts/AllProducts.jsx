import React, { createContext, useContext, useEffect, useState } from "react";
import { listProducts } from "../service/ProductService";

// Create the context
const ProductContext = createContext({});

// Custom hook MUST be declared before the component export
export const useProducts = () => {
  return useContext(ProductContext);
};

export default function AllProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(() => {
    listProducts().then(response => {
      setAllProducts(response.data); 
    })
    .catch(error => {
      console.error("Failed to load products", error);
    });;
  })

  return (
    <ProductContext.Provider value={{allProducts, setAllProducts}}>
      {children}
    </ProductContext.Provider >
  );
}
