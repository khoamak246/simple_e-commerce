package com.e_commerce.repository;

import com.e_commerce.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartItemsRepository extends JpaRepository<CartItems, Long> {
    @Query(value = "delete from cart_items where id = :id", nativeQuery = true)
    @Modifying
    void deleteById(@Param("id") Long id);
}
