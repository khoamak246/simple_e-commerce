package com.e_commerce.service;

import com.e_commerce.dto.request.UpdateShopForm;
import com.e_commerce.dto.response.RevenueManagementResponse;
import com.e_commerce.dto.response.SaleManagementResponse;
import com.e_commerce.dto.response.ShopResponse;
import com.e_commerce.dto.response.ShopRevenueResponse;
import com.e_commerce.model.Shop;
import com.e_commerce.model.User;
import com.e_commerce.service.design.IGenericService;

import java.util.Optional;
import java.util.Set;

public interface IShopService extends IGenericService<Shop> {
    Shop findByUserId(Long userId);
    boolean isCurrentUserMatchShopUserid(Long shopId);
    ShopResponse createShopResponse(Shop shop);
    int countNumberFollowerShop(Long shopId);
    double sumRevenueShop(Long shopId);
    Set<ShopRevenueResponse> sumRevenueEachMonthShop(Long shopId, int year);
    SaleManagementResponse getSaleManagementByShopId(Long shopId);
    RevenueManagementResponse getRevenueManagementShop(Long shopId, int year);
    Shop updateShopFromFormAndShopId(Long shopId, UpdateShopForm updateShopForm);
    Set<User> updateFollower(User user, Shop shop);

}
