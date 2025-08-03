package com.arssekal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class OrderItemDto {
    private Long id;
    private ProductDto product;
    private int quantity;
    private double unitPrice;
}
