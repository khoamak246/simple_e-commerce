package com.e_commerce.repository;

import com.e_commerce.model.ProductOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductOptionsRepository extends JpaRepository<ProductOptions, Long> {
}
