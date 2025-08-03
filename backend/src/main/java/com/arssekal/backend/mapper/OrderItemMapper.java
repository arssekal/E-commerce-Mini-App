package com.arssekal.backend.mapper;

import com.arssekal.backend.dto.OrderItemDto;
import com.arssekal.backend.entity.OrderItem;

public class OrderItemMapper {

    public static OrderItem mapToOrder(OrderItemDto orderItemDto) {
        OrderItem orderItem = new OrderItem();
        orderItem.setId(orderItemDto.getId());
        orderItem.setProduct(ProductMapper.mapToProduct(orderItemDto.getProduct()));
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setUnitPrice(orderItemDto.getUnitPrice());
        // ⚠️ Don't set order here — set it from the service after mapping
        return orderItem;
    }

    public static OrderItemDto mapToOrderDto(OrderItem orderItem) {
        return new OrderItemDto(
            orderItem.getId(),
            ProductMapper.mapToProductDto(orderItem.getProduct()),
            orderItem.getQuantity(),
            orderItem.getUnitPrice()
        );
    }
}
