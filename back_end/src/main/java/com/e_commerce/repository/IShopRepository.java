package com.e_commerce.repository;

import com.e_commerce.dto.response.ShopRevenueResponse;
import com.e_commerce.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface IShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findByUserId(Long userId);
    @Procedure(name = "count_number_follower_shop")
    int countNumberFollowerShop(@Param("shopId") Long shopId);

    @Procedure(name = "find_total_revenue_shop")
    double sumRevenueShop(@Param("shopId") Long shopId);

    @Procedure(name = "find_revenue_each_month")
    Set<ShopRevenueResponse> sumRevenueEachMonthShop(@Param("shopId") Long shopId, @Param("year") int year);

}
