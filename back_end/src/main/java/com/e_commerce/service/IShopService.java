package com.e_commerce.service;

import com.e_commerce.dto.response.ShopResponse;
import com.e_commerce.dto.response.ShopRevenueResponse;
import com.e_commerce.model.OrderItems;
import com.e_commerce.model.Shop;
import com.e_commerce.service.design.IGenericService;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface IShopService extends IGenericService<Shop> {
    Optional<Shop> findByUserId(Long userId);
    boolean isCurrentUserMatchShopUserid(Long shopId);

    ShopResponse createShopResponse(Shop shop);

    int countNumberFollowerShop(Long shopId);

    double sumRevenueShop(Long shopId);
    Set<ShopRevenueResponse> sumRevenueEachMonthShop(Long shopId, int year);

}
