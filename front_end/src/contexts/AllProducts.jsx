import React, { createContext, useContext, useEffect, useState } from "react";
import { listProducts } from "../service/ProductService";

// Create the context
const ProductContext = createContext({});
const testProducts = [
  {
    "id": 3,
    "title": "USB charge",
    "description": "description de of the best usb charge",
    "price": 200,
    "oldPrice": 299,
    "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
    "category": "electronics",
    "stockQuantity": 12
  },
  {
    "id": 4,
    "title": "Smart Fitness Watch",
    "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
    "price": 59.49,
    "oldPrice": 89,
    "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
    "category": "electronics",
    "stockQuantity": 76
  },
  {
    "id": 5,
    "title": "Portable Bluetooth Speaker",
    "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
    "price": 39.99,
    "oldPrice": 50,
    "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
    "category": "electronics",
    "stockQuantity": 20
  },
  {
    "id": 6,
    "title": "Ergonomic Office Chair",
    "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
    "price": 199,
    "oldPrice": 251,
    "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
    "category": "electronics",
    "stockQuantity": 16
  },
  {
    "id": 7,
    "title": "4K Action Camera",
    "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
    "price": 129.95,
    "oldPrice": 299,
    "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
    "category": "electronics",
    "stockQuantity": 0
  },
  {
    "id": 8,
    "title": "Gaming Mouse RGB",
    "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
    "price": 24.99,
    "oldPrice": 61,
    "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
    "category": "electronics",
    "stockQuantity": 19
  },
  {
    "id": 9,
    "title": "Laptop Stand Adjustable",
    "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
    "price": 34.5,
    "oldPrice": 48,
    "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
    "category": "electronics",
    "stockQuantity": 2
  },
  {
    "id": 21,
    "title": "Classic Cotton T-Shirt",
    "description": "A breathable, soft cotton T-shirt designed for everyday comfort and style.",
    "price": 600,
    "oldPrice": 1900,
    "imageUrl": "/images/bffcd28d-fb46-4f41-b200-435bdad67dac-shirt-8429711_1280.jpg",
    "category": "clothes",
    "stockQuantity": 7
  },
  {
    "id": 22,
    "title": "calculatruce",
    "description": "the best scientific calculatrice you can have ",
    "price": 299,
    "oldPrice": 350,
    "imageUrl": "/images/972fde1b-4a47-44ce-8151-dfe56eccac09-blog-item-02.png",
    "category": null,
    "stockQuantity": 47
  },
  {
    "id": 24,
    "title": "Slim Fit Denim Jeans",
    "description": "Durable and stylish jeans with a slim fit cut, made for casual and formal looks.",
    "price": 299,
    "oldPrice": 320,
    "imageUrl": "/images/e7725a32-3b24-4a8e-9533-407e41934fb7-feet-349687_1280.jpg",
    "category": "clothes",
    "stockQuantity": 11
  },
  {
    "id": 25,
    "title": "Summer Floral Dress",
    "description": "Lightweight dress with colorful floral patterns, perfect for warm sunny days.",
    "price": 189,
    "oldPrice": 200,
    "imageUrl": "/images/60c68143-e3cf-46a4-9696-c4eb8c7d6c59-premium-991221_1280.jpg",
    "category": "clothes",
    "stockQuantity": 14
  },
  {
    "id": 26,
    "title": "Yoga Mat Non-Slip",
    "description": "Durable non-slip yoga mat for comfortable workouts at home or the gym.",
    "price": 300,
    "oldPrice": 399,
    "imageUrl": "/images/429cf54f-b36f-43ef-b13e-3658eed3e342-braden-collum-9HI8UJMSdZA-unsplash.jpg",
    "category": "sport and fitness",
    "stockQuantity": 9
  },
  {
    "id": 27,
    "title": "Adjustable Dumbbells Set",
    "description": "Space-saving dumbbells with adjustable weight levels for strength training.",
    "price": 320,
    "oldPrice": 400,
    "imageUrl": "/images/f95a478a-9842-4090-a7ce-07b13bed967b-alexey-demidov-ZnXjoK7BlMU-unsplash.jpg",
    "category": "sport and fitness",
    "stockQuantity": 20
  },
  {
    "id": 28,
    "title": "High-Performance Running Shoes",
    "description": "Lightweight running shoes designed for comfort and speed during workouts.",
    "price": 789,
    "oldPrice": 189,
    "imageUrl": "/images/124004f1-6ede-4b65-b4fc-aedfa76cd943-zoshua-colah-YzjKW8VPAto-unsplash.jpg",
    "category": "sport and fitness",
    "stockQuantity": 19
  }
]

// Custom hook MUST be declared before the component export
export const useProducts = () => {
  return useContext(ProductContext);
};

export default function AllProductProvider({ children }) {
  // const [allProducts, setAllProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(testProducts);
  
  // useEffect(() => {
  //   listProducts().then(response => {
  //     setAllProducts(response.data); 
  //   })
  //   .catch(error => {
  //     console.error("Failed to load products", error);
  //   });;
  // }, [])

  return (
    <ProductContext.Provider value={{allProducts, setAllProducts}}>
      {children}
    </ProductContext.Provider >
  );
}
