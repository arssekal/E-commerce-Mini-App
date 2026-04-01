package com.arssekal.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.arssekal.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase(
        String title, String description, String category);
}
