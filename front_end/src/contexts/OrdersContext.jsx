import { createContext, useState, useEffect, useContext } from "react";
import { listOrders } from '../service/OrderService';

const testOrders = [
    {
      "id": 6,
      "customerName": "ayman",
      "email": "ayman@gmail.com",
      "address": "tinjedad",
      "phone": "0655786933",
      "status": "Delivered",
      "total": 474,
      "orderDate": "2025-08-06",
      "items": [
        {
          "id": 12,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 3,
          "unitPrice": 129.95
        },
        {
          "id": 13,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 2,
          "unitPrice": 24.99
        },
        {
          "id": 14,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 7,
      "customerName": "hamid",
      "email": "hamid@gmail.com",
      "address": "tinghir",
      "phone": "0688996778",
      "status": "Processing",
      "total": 154,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 15,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 19.89
        },
        {
          "id": 16,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 4,
          "unitPrice": 24.99
        },
        {
          "id": 17,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 8,
      "customerName": "youssef",
      "email": "y@gmail.com",
      "address": "toughach",
      "phone": "0655882211",
      "status": "Pending",
      "total": 308,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 18,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 3,
          "unitPrice": 59.49
        },
        {
          "id": 19,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 1,
          "unitPrice": 129.95
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 9,
      "customerName": "hassan",
      "email": "hassan@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893799",
      "status": "Pending",
      "total": 388,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 20,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        },
        {
          "id": 21,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        },
        {
          "id": 22,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        },
        {
          "id": 23,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 1,
          "unitPrice": 129.95
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 10,
      "customerName": "mohamed",
      "email": "mouhamed@gmail.com",
      "address": "fes",
      "phone": "0654893787",
      "status": "Delivered",
      "total": 25000,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 24,
          "product": {
            "id": 21,
            "title": "Classic Cotton T-Shirt",
            "description": "A breathable, soft cotton T-shirt designed for everyday comfort and style.",
            "price": 600,
            "oldPrice": 1900,
            "imageUrl": "/images/bffcd28d-fb46-4f41-b200-435bdad67dac-shirt-8429711_1280.jpg",
            "category": "clothes",
            "stockQuantity": 7
          },
          "quantity": 1,
          "unitPrice": 25000
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 11,
      "customerName": "khalid",
      "email": "kahlid@gmail.com",
      "address": "tiznit",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 149,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 25,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 26,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 27,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 2,
          "unitPrice": 24.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 12,
      "customerName": "samir",
      "email": "samir@gmail.com",
      "address": "marrakech",
      "phone": "0654893997",
      "status": "Pending",
      "total": 298,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 28,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 5,
          "unitPrice": 19.89
        },
        {
          "id": 29,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 13,
      "customerName": "ahmed",
      "email": "ahmed@gmail.com",
      "address": "tanger",
      "phone": "0654899581",
      "status": "Delivered",
      "total": 432,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 30,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        },
        {
          "id": 31,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 3,
          "unitPrice": 34.5
        },
        {
          "id": 32,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 1,
          "unitPrice": 129.95
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 14,
      "customerName": "lhoussaine",
      "email": "lhoussaine@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 162,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 33,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 34,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 3,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 15,
      "customerName": "saida",
      "email": "saida@gmail.com",
      "address": "alnif",
      "phone": "0654893799",
      "status": "Pending",
      "total": 198,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 35,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 19.89
        },
        {
          "id": 36,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 3,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 16,
      "customerName": "sofyane",
      "email": "sofyane@gmail.com",
      "address": "alnif",
      "phone": "0617776699",
      "status": "Processing",
      "total": 100,
      "orderDate": "2025-09-02",
      "items": [
        {
          "id": 37,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 100
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 17,
      "customerName": "salma",
      "email": "salma@gmail.com",
      "address": "meknes",
      "phone": "0654898855",
      "status": "Processing",
      "total": 19,
      "orderDate": "2025-08-07",
      "items": [
        {
          "id": 38,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 19.89
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 18,
      "customerName": "chaymae",
      "email": "chaymae@gmail.net",
      "address": "Asfi",
      "phone": "0654897854",
      "status": "Delivered",
      "total": 371,
      "orderDate": "2025-08-13",
      "items": [
        {
          "id": 39,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 5,
          "unitPrice": 59.49
        },
        {
          "id": 40,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 41,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 19,
      "customerName": "layla",
      "email": "layla@gmail.com",
      "address": "tiznit",
      "phone": "0658975486",
      "status": "Processing",
      "total": 147,
      "orderDate": "2025-08-14",
      "items": [
        {
          "id": 42,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 43,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 2,
          "unitPrice": 24
        },
        {
          "id": 44,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 20,
      "customerName": "samir",
      "email": "s@gai.cd",
      "address": "trfaya",
      "phone": "0654899988",
      "status": "Processing",
      "total": 128,
      "orderDate": "2025-08-14",
      "items": [
        {
          "id": 45,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 46,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 2,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 21,
      "customerName": "ahmed",
      "email": "ahmed@g.cv",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 59,
      "orderDate": "2025-08-14",
      "items": [
        {
          "id": 47,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 22,
      "customerName": "ismail",
      "email": "is@gmail.com",
      "address": "sidi ifni",
      "phone": "0654859447",
      "status": "Pending",
      "total": 79,
      "orderDate": "2025-08-15",
      "items": [
        {
          "id": 48,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 2,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 23,
      "customerName": "lhoussaine",
      "email": "lhoussaine@gmail.com",
      "address": "tinjedad",
      "phone": "0654589746",
      "status": "pending",
      "total": 87,
      "orderDate": "2025-08-20",
      "items": [
        {
          "id": 49,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 2,
          "unitPrice": 24
        },
        {
          "id": 50,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 24,
      "customerName": "layla",
      "email": "layla@gmail.com",
      "address": "asfi",
      "phone": "0654898774",
      "status": "pending",
      "total": 25103,
      "orderDate": "2025-08-22",
      "items": [
        {
          "id": 51,
          "product": {
            "id": 21,
            "title": "Classic Cotton T-Shirt",
            "description": "A breathable, soft cotton T-shirt designed for everyday comfort and style.",
            "price": 600,
            "oldPrice": 1900,
            "imageUrl": "/images/bffcd28d-fb46-4f41-b200-435bdad67dac-shirt-8429711_1280.jpg",
            "category": "clothes",
            "stockQuantity": 7
          },
          "quantity": 1,
          "unitPrice": 25000
        },
        {
          "id": 52,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 3,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 25,
      "customerName": "karim",
      "email": "ka@gmail.com",
      "address": "trfaya",
      "phone": "0658997711",
      "status": "pending",
      "total": 84,
      "orderDate": "2025-08-22",
      "items": [
        {
          "id": 53,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 54,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 26,
      "customerName": "walid",
      "email": "walid@gmail.com",
      "address": "tinjedad",
      "phone": "0788993340",
      "status": "Processing",
      "total": 377,
      "orderDate": "2025-08-25",
      "items": [
        {
          "id": 55,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 3,
          "unitPrice": 59.49
        },
        {
          "id": 56,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 27,
      "customerName": "walid",
      "email": "test@gmail.com",
      "address": "tinghir",
      "phone": "0654893744",
      "status": "pending",
      "total": 1230,
      "orderDate": "2025-08-25",
      "items": [
        {
          "id": 57,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 58,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 3,
          "unitPrice": 199
        },
        {
          "id": 59,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 2,
          "unitPrice": 129.95
        },
        {
          "id": 60,
          "product": {
            "id": 22,
            "title": "calculatruce",
            "description": "the best scientific calculatrice you can have ",
            "price": 299,
            "oldPrice": 350,
            "imageUrl": "/images/972fde1b-4a47-44ce-8151-dfe56eccac09-blog-item-02.png",
            "category": null,
            "stockQuantity": 47
          },
          "quantity": 1,
          "unitPrice": 299
        },
        {
          "id": 61,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 28,
      "customerName": "samir",
      "email": "samir123@gmail.com",
      "address": "agadir",
      "phone": "0612345678",
      "status": "pending",
      "total": 83,
      "orderDate": "2025-08-25",
      "items": [
        {
          "id": 62,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 24
        },
        {
          "id": 63,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 29,
      "customerName": "karim",
      "email": "karim@gmail.com",
      "address": "asfi",
      "phone": "0612345789",
      "status": "pending",
      "total": 437.95,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 64,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 2,
          "unitPrice": 59.49
        },
        {
          "id": 65,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 3,
          "unitPrice": 39.99
        },
        {
          "id": 66,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 30,
      "customerName": "said",
      "email": "s@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893799",
      "status": "pending",
      "total": 301.95,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 67,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 24
        },
        {
          "id": 68,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 4,
          "unitPrice": 59.49
        },
        {
          "id": 69,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 31,
      "customerName": "sanae",
      "email": "sanae@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654895666",
      "status": "pending",
      "total": 83.49,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 70,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 24
        },
        {
          "id": 71,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 32,
      "customerName": "rami",
      "email": "rami@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654812345",
      "status": "pending",
      "total": 99.48,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 72,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 73,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 33,
      "customerName": "ggggg",
      "email": "gggg@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0699666655",
      "status": "Delivered",
      "total": 24,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 74,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 24
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 34,
      "customerName": "nasima",
      "email": "nasima@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893799",
      "status": "Processing",
      "total": 153.95,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 75,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 24
        },
        {
          "id": 76,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 1,
          "unitPrice": 129.95
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 35,
      "customerName": "layla ",
      "email": "layla@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654898899",
      "status": "Processing",
      "total": 99.48,
      "orderDate": "2025-08-26",
      "items": [
        {
          "id": 77,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 78,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 36,
      "customerName": "somaya",
      "email": "somaya@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893788",
      "status": "pending",
      "total": 118.98,
      "orderDate": "2025-08-27",
      "items": [
        {
          "id": 79,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 2,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 37,
      "customerName": "kawtar",
      "email": "k@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893889",
      "status": "pending",
      "total": 154.94,
      "orderDate": "2025-08-27",
      "items": [
        {
          "id": 80,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 1,
          "unitPrice": 129.95
        },
        {
          "id": 81,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 38,
      "customerName": "test",
      "email": "t@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 39.99,
      "orderDate": "2025-08-27",
      "items": [
        {
          "id": 82,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 39,
      "customerName": "kanza",
      "email": "kk@gmail.com",
      "address": "ourzazate",
      "phone": "0654893733",
      "status": "pending",
      "total": 79.98,
      "orderDate": "2025-08-27",
      "items": [
        {
          "id": 83,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 2,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 40,
      "customerName": "arssek",
      "email": "a@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 59.49,
      "orderDate": "2025-08-27",
      "items": [
        {
          "id": 84,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 43,
      "customerName": "arssek",
      "email": "arssek@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 99.48,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 90,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 91,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 44,
      "customerName": "arssekal",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 131.49,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 92,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 3,
          "unitPrice": 24
        },
        {
          "id": 93,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 45,
      "customerName": "arssekall",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 800,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 94,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 4,
          "unitPrice": 200
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 46,
      "customerName": "kall",
      "email": "kall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 298.48,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 95,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 96,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 97,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 48,
      "customerName": "test",
      "email": "test@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 0,
      "orderDate": "2025-08-28",
      "items": [],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 49,
      "customerName": "test",
      "email": "test@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 259.49,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 100,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        },
        {
          "id": 101,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 52,
      "customerName": "lamya",
      "email": "lamya@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 39.99,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 106,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 53,
      "customerName": "imade",
      "email": "imade@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 238.99,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 107,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 108,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 1,
          "unitPrice": 199
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 55,
      "customerName": "nadia",
      "email": "nadia@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 1659.49,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 110,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 8,
          "unitPrice": 200
        },
        {
          "id": 111,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 56,
      "customerName": "arssekal",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 535.41,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 112,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 9,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 57,
      "customerName": "amir",
      "email": "amir@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 594.9,
      "orderDate": "2025-08-28",
      "items": [
        {
          "id": 113,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 10,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 58,
      "customerName": "arss",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 0,
      "orderDate": "2025-08-30",
      "items": [],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 59,
      "customerName": "azul",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 74.97,
      "orderDate": "2025-08-30",
      "items": [
        {
          "id": 114,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 3,
          "unitPrice": 24.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 60,
      "customerName": "sa3id",
      "email": "sa3id@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Processing",
      "total": 1054.39,
      "orderDate": "2025-08-30",
      "items": [
        {
          "id": 115,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 2,
          "unitPrice": 200
        },
        {
          "id": 116,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 11,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 61,
      "customerName": "hadda",
      "email": "hadda@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 831.99,
      "orderDate": "2025-08-30",
      "items": [
        {
          "id": 117,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 3,
          "unitPrice": 200
        },
        {
          "id": 118,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 119,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 5,
          "unitPrice": 34.5
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 62,
      "customerName": "ayman",
      "email": "ayman@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 532.36,
      "orderDate": "2025-08-31",
      "items": [
        {
          "id": 120,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 2,
          "unitPrice": 129.95
        },
        {
          "id": 121,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        },
        {
          "id": 122,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 4,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 63,
      "customerName": "so3ad",
      "email": "so3ad@gmail.com",
      "address": "tazna9t",
      "phone": "0612345678",
      "status": "pending",
      "total": 109.47,
      "orderDate": "2025-09-05",
      "items": [
        {
          "id": 123,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        },
        {
          "id": 124,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 2,
          "unitPrice": 24.99
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 64,
      "customerName": "rim",
      "email": "rim@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 1178.47,
      "orderDate": "2025-09-06",
      "items": [
        {
          "id": 125,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 5,
          "unitPrice": 200
        },
        {
          "id": 126,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 3,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 65,
      "customerName": "najib",
      "email": "najib@gmail.com",
      "address": "paris",
      "phone": "0654893733",
      "status": "pending",
      "total": 1458.98,
      "orderDate": "2025-09-09",
      "items": [
        {
          "id": 127,
          "product": {
            "id": 6,
            "title": "Ergonomic Office Chair",
            "description": "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for all-day comfort and productivity.",
            "price": 199,
            "oldPrice": 251,
            "imageUrl": "/images/f37ae217-933d-4019-8762-223b8ae46b25-office chaire.jpg",
            "category": "electronics",
            "stockQuantity": 16
          },
          "quantity": 4,
          "unitPrice": 199
        },
        {
          "id": 128,
          "product": {
            "id": 5,
            "title": "Portable Bluetooth Speaker",
            "description": "Compact and powerful speaker with deep bass and long battery life. Perfect for outdoor activities and travel.",
            "price": 39.99,
            "oldPrice": 50,
            "imageUrl": "/images/ebe44ae0-7630-484a-a0c0-10dc605b0e3b-haut parleur.jpg",
            "category": "electronics",
            "stockQuantity": 20
          },
          "quantity": 1,
          "unitPrice": 39.99
        },
        {
          "id": 129,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        },
        {
          "id": 130,
          "product": {
            "id": 22,
            "title": "calculatruce",
            "description": "the best scientific calculatrice you can have ",
            "price": 299,
            "oldPrice": 350,
            "imageUrl": "/images/972fde1b-4a47-44ce-8151-dfe56eccac09-blog-item-02.png",
            "category": null,
            "stockQuantity": 47
          },
          "quantity": 2,
          "unitPrice": 299
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 66,
      "customerName": "hajar",
      "email": "hajar@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 897,
      "orderDate": "2025-09-10",
      "items": [
        {
          "id": 131,
          "product": {
            "id": 24,
            "title": "Slim Fit Denim Jeans",
            "description": "Durable and stylish jeans with a slim fit cut, made for casual and formal looks.",
            "price": 299,
            "oldPrice": 320,
            "imageUrl": "/images/e7725a32-3b24-4a8e-9533-407e41934fb7-feet-349687_1280.jpg",
            "category": "clothes",
            "stockQuantity": 11
          },
          "quantity": 3,
          "unitPrice": 299
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 67,
      "customerName": "hajar@gmail.com",
      "email": "hajar2@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 358.49,
      "orderDate": "2025-09-10",
      "items": [
        {
          "id": 132,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        },
        {
          "id": 133,
          "product": {
            "id": 9,
            "title": "Laptop Stand Adjustable",
            "description": "Ergonomic laptop stand with adjustable height and angle. Improves posture and reduces neck strain while working.",
            "price": 34.5,
            "oldPrice": 48,
            "imageUrl": "/images/912d8415-ce79-4eff-bbcd-b21a584b95ce-laptop support.jpg",
            "category": "electronics",
            "stockQuantity": 2
          },
          "quantity": 1,
          "unitPrice": 34.5
        },
        {
          "id": 134,
          "product": {
            "id": 22,
            "title": "calculatruce",
            "description": "the best scientific calculatrice you can have ",
            "price": 299,
            "oldPrice": 350,
            "imageUrl": "/images/972fde1b-4a47-44ce-8151-dfe56eccac09-blog-item-02.png",
            "category": null,
            "stockQuantity": 47
          },
          "quantity": 1,
          "unitPrice": 299
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 68,
      "customerName": "arssekal",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 200,
      "orderDate": "2025-09-12",
      "items": [
        {
          "id": 135,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 69,
      "customerName": "said",
      "email": "said@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Pending",
      "total": 259.49,
      "orderDate": "2025-09-12",
      "items": [
        {
          "id": 136,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        },
        {
          "id": 137,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 70,
      "customerName": "mohsine",
      "email": "mohsine@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 389.85,
      "orderDate": "2025-09-12",
      "items": [
        {
          "id": 138,
          "product": {
            "id": 7,
            "title": "4K Action Camera",
            "description": "Capture stunning 4K videos and photos with this waterproof action cam. Ideal for adventure and sports enthusiasts.",
            "price": 129.95,
            "oldPrice": 299,
            "imageUrl": "/images/0cab2069-d63e-441b-ba5d-d4f265ea2627-camera.jpg",
            "category": "electronics",
            "stockQuantity": 0
          },
          "quantity": 3,
          "unitPrice": 129.95
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 71,
      "customerName": "samira",
      "email": "samira@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 259.49,
      "orderDate": "2025-09-12",
      "items": [
        {
          "id": 139,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        },
        {
          "id": 140,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 72,
      "customerName": "ayman",
      "email": "ayman@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 918.98,
      "orderDate": "2025-09-13",
      "items": [
        {
          "id": 141,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 4,
          "unitPrice": 200
        },
        {
          "id": 142,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 2,
          "unitPrice": 59.49
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 73,
      "customerName": "test",
      "email": "testing@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 200,
      "orderDate": "2026-04-01",
      "items": [
        {
          "id": 143,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        }
      ],
      "seen": true,
      "isSeen": true
    },
    {
      "id": 74,
      "customerName": "said",
      "email": "test2@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 59.49,
      "orderDate": "2023-04-01",
      "items": [
        {
          "id": 144,
          "product": {
            "id": 4,
            "title": "Smart Fitness Watch",
            "description": "Track your steps, heart rate, and sleep with this stylish and water-resistant fitness watch. Compatible with iOS and Android.",
            "price": 59.49,
            "oldPrice": 89,
            "imageUrl": "/images/080252e4-f81b-4542-a91a-9ac6500979fe-watch.jpg",
            "category": "electronics",
            "stockQuantity": 76
          },
          "quantity": 1,
          "unitPrice": 59.49
        }
      ],
      "seen": false,
      "isSeen": false
    },
    {
      "id": 75,
      "customerName": "ahmed",
      "email": "samah@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "pending",
      "total": 300,
      "orderDate": "2025-09-18",
      "items": [
        {
          "id": 145,
          "product": {
            "id": 26,
            "title": "Yoga Mat Non-Slip",
            "description": "Durable non-slip yoga mat for comfortable workouts at home or the gym.",
            "price": 300,
            "oldPrice": 399,
            "imageUrl": "/images/429cf54f-b36f-43ef-b13e-3658eed3e342-braden-collum-9HI8UJMSdZA-unsplash.jpg",
            "category": "sport and fitness",
            "stockQuantity": 9
          },
          "quantity": 1,
          "unitPrice": 300
        }
      ],
      "seen": false,
      "isSeen": false
    },
    {
      "id": 76,
      "customerName": "arssekal",
      "email": "arssekall@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654893733",
      "status": "Delivered",
      "total": 598,
      "orderDate": "2025-09-18",
      "items": [
        {
          "id": 146,
          "product": {
            "id": 24,
            "title": "Slim Fit Denim Jeans",
            "description": "Durable and stylish jeans with a slim fit cut, made for casual and formal looks.",
            "price": 299,
            "oldPrice": 320,
            "imageUrl": "/images/e7725a32-3b24-4a8e-9533-407e41934fb7-feet-349687_1280.jpg",
            "category": "clothes",
            "stockQuantity": 11
          },
          "quantity": 2,
          "unitPrice": 299
        }
      ],
      "seen": false,
      "isSeen": false
    },
    {
      "id": 77,
      "customerName": "lhoussaine",
      "email": "lhoussaine@gmail.com",
      "address": "Annexe de cité universitaire",
      "phone": "0654812333",
      "status": "pending",
      "total": 224.99,
      "orderDate": "2025-09-18",
      "items": [
        {
          "id": 147,
          "product": {
            "id": 3,
            "title": "USB charge",
            "description": "description de of the best usb charge",
            "price": 200,
            "oldPrice": 299,
            "imageUrl": "/images/deeaaf54-b207-49c2-bad6-99ef1e96a4ed-usb charge.jpg",
            "category": "electronics",
            "stockQuantity": 11
          },
          "quantity": 1,
          "unitPrice": 200
        },
        {
          "id": 148,
          "product": {
            "id": 8,
            "title": "Gaming Mouse RGB",
            "description": "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Built for competitive gamers.",
            "price": 24.99,
            "oldPrice": 61,
            "imageUrl": "/images/e6cc552e-138c-4358-b2d9-18e51ab10fcb-mouse.jpg",
            "category": "electronics",
            "stockQuantity": 18
          },
          "quantity": 1,
          "unitPrice": 24.99
        }
      ],
      "seen": false,
      "isSeen": false
    }
]
const OrdersContext = createContext({})

export const useOrders = () => {
    return useContext(OrdersContext);
}

export default function OrdersProvider({children}) {
    // const [orders, setOrders] = useState(null)
    const [orders, setOrders] = useState(testOrders)

    // useEffect(() => {
    //     listOrders().then((responce) => {
    //       setOrders(responce.data)
    //     })
    //     .catch((err) => console.log(err))
    // }, [])

    return (
        <OrdersContext.Provider value={{orders, setOrders}}>
            {children}
        </OrdersContext.Provider>
    )
}