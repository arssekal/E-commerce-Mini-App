package com.arssekal.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arssekal.backend.dto.ProductDto;
import com.arssekal.backend.services.ProductService;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    @PostMapping("/")
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto) {
        ProductDto addedProduct = productService.addProduct(productDto);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
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

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto newProductDto) {
        ProductDto savedProduct = productService.updateProduct(id, newProductDto);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductDto> deletePrduct(@PathVariable Long id) {
        ProductDto deletedProduct = productService.deleteProduct(id);
        return ResponseEntity.ok(deletedProduct);
    }
}
