import React, { createContext, useContext, useEffect, useState } from "react";
import { listProducts } from "../service/ProductService";

// Create the context
const ProductContext = createContext({});

// products
// const products = [
//   {
//     id: 1,
//     title: "Wireless Bluetooth Headphones",
//     price: 79.99,
//     imageUrl: "/images/image1.jpg",
//     description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Ideal for music lovers and professionals.",
//   },
//   {
//     id: 2,
//     title: "Smart Fitness Watch",
//     price: 59.49,
//     imageUrl: "/images/image2.jpg",
//     description: "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
//   },
//   {
//     id: 3,
//     title: "Portable Bluetooth Speaker",
//     price: 39.99,
//     imageUrl: "/images/image3.jpg",
//     description: "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
//   },
//   {
//     id: 4,
//     title: "Ergonomic Office Chair",
//     price: 199.00,
//     imageUrl: "/images/image4.jpg",
//     description: "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
//   },
//   {
//     id: 5,
//     title: "4K Action Camera",
//     price: 129.95,
//     imageUrl: "/images/image5.jpg",
//     description: "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
//   },
//   {
//     id: 6,
//     title: "Gaming Mouse RGB",
//     price: 24.99,
//     imageUrl: "/images/image6.jpg",
//     description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
//   },
//   {
//     id: 7,
//     title: "Laptop Stand Adjustable",
//     price: 34.50,
//     imageUrl: "/images/image7.jpg",
//     description: "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
//   },
//   {
//     id: 8,
//     title: "USB-C Charging Hub",
//     price: 19.89,
//     imageUrl: "/images/image8.jpg",
//     description: "Versatile USB-C hub with multiple ports for charging and data transfer. Compact design for everyday convenience.",
//   },
// ];

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
