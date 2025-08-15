package com.arssekal.backend.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class OrderDto {
    private Long id;
    private String customerName;
    private String email;
    private String address;
    private String phone;
    // change
    private String status;
    private Long total;
    private LocalDate orderDate;
    private List<OrderItemDto> items;
}
