package com.arssekal.backend.entity;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "product")

public class Product {
    @Id
    // auto increment
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private double price;
    private double oldPrice;
    private String imageUrl;
    private Long stockQuantity;
}
