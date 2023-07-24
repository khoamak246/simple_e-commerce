package com.e_commerce.repository;

import com.e_commerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    Set<Product> findByNameContainingIgnoreCase(String name);

    Set<Product> findByShopId(Long shopId);
}
