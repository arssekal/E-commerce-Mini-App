package com.arssekal.backend.services;

import java.util.List;

import com.arssekal.backend.dto.OrderDto;

public interface OrderService {
    OrderDto addOrder(OrderDto orderDto);
    OrderDto getOrder(Long id);
    OrderDto updateOrderStatus(Long id, String status);
    List<OrderDto> getAllOrders();
    OrderDto deleteOrder(Long id);
    void markOrdersAsSeen();
}
