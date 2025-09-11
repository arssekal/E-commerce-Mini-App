package com.arssekal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private double price;
    // change
    private double oldPrice;
    private String imageUrl;
    private String category;
    private Long stockQuantity;
}
