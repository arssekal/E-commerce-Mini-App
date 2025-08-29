package com.arssekal.backend.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    private double total;
    private LocalDate orderDate;
    @JsonProperty("isSeen") 
    private boolean isSeen;
    
    private List<OrderItemDto> items;
}
