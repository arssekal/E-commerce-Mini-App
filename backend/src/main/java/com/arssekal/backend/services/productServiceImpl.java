package com.arssekal.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.arssekal.backend.dto.ProductDto;
import com.arssekal.backend.entity.Product;
import com.arssekal.backend.mapper.ProductMapper;
import com.arssekal.backend.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class productServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public ProductDto addProduct(ProductDto productDto) {
        Product product = ProductMapper.mapToProduct(productDto);
        Product addedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(addedProduct);
    };

    @Override
    public ProductDto getProduct(Long id) {
        Product product = productRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("product with this id is not available"));
        return ProductMapper.mapToProductDto(product);
    };

    @Override
    public ProductDto updateProduct(Long id, ProductDto newProductDto) {
        Product product = productRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("product with this id is not available"));

        product.setTitle(newProductDto.getTitle());
        product.setDescription(newProductDto.getDescription());
        product.setPrice(newProductDto.getPrice());
        // change
        product.setOldPrice(newProductDto.getOldPrice());
        product.setImageUrl(newProductDto.getImageUrl());
        product.setStockQuantity(newProductDto.getStockQuantity());

        Product updatedProduct = productRepository.save(product);

        return ProductMapper.mapToProductDto(updatedProduct);
    };

    @Override
    public ProductDto deleteProduct(Long id) {
        Product product = productRepository
                        .findById(id)
                        .orElseThrow(() -> new RuntimeException("product with this id is not available"));
        productRepository.delete(product);
        return ProductMapper.mapToProductDto(product);
    };

    @Override
    public List<ProductDto> getAllProducts() {
        List<ProductDto> productDtos = productRepository
                                    .findAll()
                                    .stream()
                                    .map((product) -> ProductMapper.mapToProductDto(product))
                                    .collect(Collectors.toList());
        return productDtos;
    };

}
