package com.arssekal.backend.services;

import java.util.List;

import com.arssekal.backend.dto.ProductDto;
import com.arssekal.backend.dto.SoldItemDTO;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto);
    ProductDto getProduct(Long id);
    ProductDto updateProduct(Long id, ProductDto newProductDto);
    ProductDto deleteProduct(Long id);
    List<ProductDto> getAllProducts();
    String updateStockQuantity(List<SoldItemDTO> soldItems);

}
