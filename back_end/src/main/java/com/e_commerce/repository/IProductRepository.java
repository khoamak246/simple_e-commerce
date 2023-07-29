package com.e_commerce.repository;

import com.e_commerce.dto.response.ProductResponse;
import com.e_commerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    Set<Product> findByNameContainingIgnoreCase(String name);

    Set<Product> findByShopId(Long shopId);

    Set<Product> findTop10ByShopIdOrderByVisitNumberDesc(Long shopId);

    int countByShopId(Long shopId);

    @Procedure(name = "find_top_ten_product_have_max_number_order")
    Set<ProductResponse> findTop10ProductHaveMaxNumberOrder(@Param("shopId") Long shopId);

    @Procedure(name = "find_top_ten_favorites_product")
    Set<ProductResponse> findTop10ProductHaveMaxFavorites(@Param("shopId") Long shopId);

    @Procedure(name = "find_product_have_max_cancel_order_percent")
    Optional<ProductResponse> findProductHaveMaxCancelOrderPercent(@Param("shop_id") Long shopId);

    @Procedure(name = "find_product_have_max_return_order_percent")
    Optional<ProductResponse> findProductHaveMaxReturnOrderPercent(@Param("shopId") Long shopId);

    @Procedure(name = "find_top_five_product_have_max_revenue")
    Set<ProductResponse> findTopFiveProductHaveMaxRevenue(@Param("shopId") Long shopId);
}
