package com.arssekal.backend.controllers;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arssekal.backend.dto.OrderDto;
import com.arssekal.backend.services.OrderService;


@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private OrderService orderService;

    @PostMapping("/")
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
        OrderDto order = orderService.addOrder(orderDto);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long id) {
        OrderDto order = orderService.getOrder(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    // update order's status
    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        OrderDto order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(order);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<OrderDto> deletePrduct(@PathVariable Long id) {
        OrderDto deletedOrder = orderService.deleteOrder(id);
        return ResponseEntity.ok(deletedOrder);
    }

    @PutMapping("/order-seens")
    public String markOrdersAsSeen() {
        orderService.markOrdersAsSeen();
        return "orders are  maked as seen";
    }
}
