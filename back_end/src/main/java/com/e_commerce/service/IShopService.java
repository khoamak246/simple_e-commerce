package com.e_commerce.service;

import com.e_commerce.dto.response.ShopResponse;
import com.e_commerce.model.Shop;
import com.e_commerce.service.design.IGenericService;

import java.util.Optional;

public interface IShopService extends IGenericService<Shop> {
    Optional<Shop> findByUserId(Long userId);
    boolean isCurrentUserMatchShopUserid(Long shopId);

    ShopResponse createShopResponse(Shop shop);
}
