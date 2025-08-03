package com.arssekal.backend.mapper;

import com.arssekal.backend.dto.ProductDto;
import com.arssekal.backend.entity.Product;

public class ProductMapper {
    
    public static Product mapToProduct(ProductDto productDto) {
        return new Product(
            productDto.getId(),
            productDto.getTitle(),
            productDto.getDescription(),
            productDto.getPrice(),
            productDto.getImageUrl(),
            productDto.getStockQuantity()
        );
    }

    public static ProductDto mapToProductDto(Product product) {
        return new ProductDto(
            product.getId(),
            product.getTitle(),
            product.getDescription(),
            product.getPrice(),
            product.getImageUrl(),
            product.getStockQuantity()
        );
    }
}
