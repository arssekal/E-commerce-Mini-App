import React, { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext({});

const addedProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    imageUrl: "/images/image1.jpg",
    quantity: 2
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 59.49,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 3,
    title: "Portable Bluetooth Speaker",
    price: 39.99,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 4,
    title: "Ergonomic Office Chair",
    price: 199.00,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 5,
    title: "4K Action Camera",
    price: 129.95,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 6,
    title: "Gaming Mouse RGB",
    price: 24.99,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 7,
    title: "Laptop Stand Adjustable",
    price: 34.50,
    imageUrl: "/images/image1.jpg",
  },
  {
    id: 8,
    title: "USB-C Charging Hub",
    price: 19.89,
    imageUrl: "/images/image1.jpg",
  },
];

export const useCartData = () => {
  return useContext(CartContext);
};

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  const [productCount, setProductCount] = useState(0)

  return (
    <CartContext.Provider value={{ cartData, setCartData, productCount, setProductCount}}>
      {children}
    </CartContext.Provider>
  );
}
