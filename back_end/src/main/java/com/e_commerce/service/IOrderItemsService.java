package com.e_commerce.service;

import com.e_commerce.model.OrderItems;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface IOrderItemsService extends IGenericService<OrderItems> {
    Set<OrderItems> findByShopId(Long shopId);
}
