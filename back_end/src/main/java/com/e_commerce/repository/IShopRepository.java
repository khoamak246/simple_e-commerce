package com.e_commerce.repository;

import com.e_commerce.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findByUserId(Long userId);
}
