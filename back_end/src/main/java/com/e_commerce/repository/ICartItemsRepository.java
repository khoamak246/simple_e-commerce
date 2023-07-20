package com.e_commerce.repository;

import com.e_commerce.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartItemsRepository extends JpaRepository<CartItems, Long> {
}
