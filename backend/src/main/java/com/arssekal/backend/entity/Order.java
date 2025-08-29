package com.arssekal.backend.entity;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@CrossOrigin("*")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity // this class is a jpa entity
@Table(name = "orders")

public class Order {
    @Id
    // auto increment
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String email;
    private String address;
    private String phone;
    // change
    private String status;
    private double total;
    private LocalDate orderDate;
    private boolean isSeen;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}
