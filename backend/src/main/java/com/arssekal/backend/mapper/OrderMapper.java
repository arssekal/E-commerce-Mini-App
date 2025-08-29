package com.arssekal.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.arssekal.backend.dto.OrderDto;
import com.arssekal.backend.dto.OrderItemDto;
import com.arssekal.backend.entity.Order;
import com.arssekal.backend.entity.OrderItem;

public class OrderMapper {
    public static Order mapToOrder(OrderDto orderDto) {
       List<OrderItem> orderItems = orderDto.getItems().stream()
                                    .map(OrderItemMapper::mapToOrder)
                                    .collect(Collectors.toList());
        return new Order(
            orderDto.getId(),
            orderDto.getCustomerName(),
            orderDto.getEmail(),
            orderDto.getAddress(),
            orderDto.getPhone(),
            // change
            orderDto.getStatus(),
            orderDto.getTotal(),
            orderDto.getOrderDate(),
            orderDto.isSeen(),
            orderItems
        );
    }

    public static OrderDto mapToOrderDto(Order order) {
        List<OrderItemDto> orderItems = order.getItems().stream()
                                    .map(OrderItemMapper::mapToOrderDto)
                                    .collect(Collectors.toList());
        return new OrderDto(
            order.getId(),
            order.getCustomerName(),
            order.getEmail(),
            order.getAddress(),
            order.getPhone(),
            // change
            order.getStatus(),
            order.getTotal(),
            order.getOrderDate(),
            order.isSeen(),
            orderItems
        );
    }

}
