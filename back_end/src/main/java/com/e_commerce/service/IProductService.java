package com.e_commerce.service;

import com.e_commerce.dto.request.UpdateProductForm;
import com.e_commerce.dto.response.ProductResponse;
import com.e_commerce.model.Product;
import com.e_commerce.model.User;
import com.e_commerce.model.UserInfo;
import com.e_commerce.service.design.IGenericService;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface IProductService extends IGenericService<Product> {
    Set<Product> findByNameContainingIgnoreCase(String name);
    Set<Product> createSetProductFromDtoForm(Set<Long> productsDtoForm);
    Set<Product> findByShopId(Long shopId);
    Set<ProductResponse> findTop10ProductHaveMaxNumberOrder(Long shopId);
    Set<ProductResponse> findTop10ProductHaveMaxFavorites(Long shopId);
    Optional<ProductResponse> findProductHaveMaxCancelOrderPercent(@Param("shopId") Long shopId);
    Optional<ProductResponse> findProductHaveMaxReturnOrderPercent(Long shopId);
    Set<ProductResponse> findTopFiveProductHaveMaxRevenue(@Param("shopId") Long shopId);
    Set<ProductResponse> findTopPaymentProduct(int offsetNumber, int limitNumber);
    Set<Product> findTop10ByShopIdOrderByVisitNumberDesc(Long shopId);
    int countByShopId(Long shopId);
    double getMinPriceProductOption(Product product);
    Product updateProductByFrom(Product product, UpdateProductForm updateProductForm);
    Set<UserInfo> addProductFavorites(User user, Product product);
}
