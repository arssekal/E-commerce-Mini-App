package com.arssekal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arssekal.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
