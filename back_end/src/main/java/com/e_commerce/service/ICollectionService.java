package com.e_commerce.service;

import com.e_commerce.model.Collection;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface ICollectionService extends IGenericService<Collection> {
    boolean existsByNameIgnoreCaseAndShopId(String name, Long shopId);
    Set<Collection> findByShopId(Long shopId);
}
