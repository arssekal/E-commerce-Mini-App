package com.arssekal.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.arssekal.backend.dto.OrderDto;
import com.arssekal.backend.entity.Order;
import com.arssekal.backend.entity.OrderItem;
import com.arssekal.backend.entity.Product;
import com.arssekal.backend.mapper.OrderItemMapper;
import com.arssekal.backend.mapper.OrderMapper;
import com.arssekal.backend.repository.OrderRepository;
import com.arssekal.backend.repository.ProductRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private ProductRepository productRepository;

    @Override
    public OrderDto addOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setCustomerName(orderDto.getCustomerName());
        order.setEmail(orderDto.getEmail());
        order.setTotal(orderDto.getTotal());
        order.setOrderDate(orderDto.getOrderDate());

        List<OrderItem> items = orderDto.getItems().stream()
            .map(itemDto -> {
                OrderItem item = OrderItemMapper.mapToOrder(itemDto);

                // Ensure product is managed (fetched from DB)
                Product product = productRepository.findById(itemDto.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
                item.setProduct(product);

                item.setOrder(order); // Set the relationship
                return item;
            })
            .collect(Collectors.toList());

        order.setItems(items);

        return OrderMapper.mapToOrderDto(orderRepository.save(order)); // Cascade saves all items
    }
    
    @Override
    public OrderDto getOrder(Long id) {
        Order order = orderRepository
                    .findById(id)
                    .orElseThrow(() -> new RuntimeException("there is no order with this id"));
        return OrderMapper.mapToOrderDto(order);               
    }
    
    @Override
    public List<OrderDto> getAllOrders() {
        List<OrderDto> orders = orderRepository
                            .findAll()
                            .stream()
                            .map((order) -> OrderMapper.mapToOrderDto(order))
                            .collect(Collectors.toList());
        return orders;
    }
    
    @Override
    public OrderDto deleteOrder(Long id) {
        Order order = orderRepository
                    .findById(id)
                    .orElseThrow(() -> new RuntimeException("there is no order with this id"));
        orderRepository.delete(order);
        return OrderMapper.mapToOrderDto(order); 
    }
    
}
