package com.e_commerce.repository;

import com.e_commerce.model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IOrderItemsRepository extends JpaRepository<OrderItems, Long> {
    Set<OrderItems> findByShopId(Long shopId);
    Set<OrderItems> findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(Long shopId, String status);
}
