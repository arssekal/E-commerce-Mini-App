package com.arssekal.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arssekal.backend.dto.ProductDto;
import com.arssekal.backend.dto.SoldItemDTO;
import com.arssekal.backend.services.ProductService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> addProduct(
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("price") double price,
        @RequestParam("category") String category,
        @RequestParam("stockQuantity") Long stockQuantity,
        @RequestParam("image") MultipartFile imageFile
    ) throws IOException {
        // Save image to frontend /public/images
        String frontendPath = "C:\\Users\\ASUS\\Desktop\\learn react TarmzeAcademy\\E-commerce-Mini-App\\front_end/public/images/";
        String filename = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
        File dest = new File(frontendPath + filename);
        imageFile.transferTo(dest);

        // Save product
        ProductDto product = new ProductDto();
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setStockQuantity(stockQuantity);
        product.setImageUrl("/images/" + filename);

        ProductDto saved = productService.addProduct(product);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        ProductDto product = productService.getProduct(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto newProductDto) {
    //     ProductDto savedProduct = productService.updateProduct(id, newProductDto);
    //     return ResponseEntity.ok(savedProduct);
    // }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> updateProduct(
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("price") double price,
        // chnage
        @RequestParam("oldPrice") double oldPrice,
        @RequestParam("category") String category,
        @RequestParam("stockQuantity") Long stockQuantity,
        @RequestParam("image") MultipartFile imageFile,
        @RequestParam("id") Long id
    ) throws IOException {
        // Save image to frontend /public/images
        String frontendPath = "C:\\Users\\ASUS\\Desktop\\learn react TarmzeAcademy\\E-commerce-Mini-App\\front_end/public/images/";
        String filename = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
        File dest = new File(frontendPath + filename);
        imageFile.transferTo(dest);

        // Save product
        ProductDto product = new ProductDto();
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        // chnage
        product.setOldPrice(oldPrice);
        product.setCategory(category);
        product.setStockQuantity(stockQuantity);
        product.setImageUrl("/images/" + filename);

        ProductDto saved = productService.updateProduct(id, product);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductDto> deletePrduct(@PathVariable Long id) {
        ProductDto deletedProduct = productService.deleteProduct(id);
        return ResponseEntity.ok(deletedProduct);
    }


    @PutMapping("/update-stock")
    public ResponseEntity<String> updateStockQuantity(@RequestBody List<SoldItemDTO> soldItems) {
        productService.updateStockQuantity(soldItems);
        return  ResponseEntity.ok("Stock updated successfully");
    }
}
