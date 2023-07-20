package com.e_commerce.service;

import com.e_commerce.model.Collection;
import com.e_commerce.service.design.IGenericService;

public interface ICollectionService extends IGenericService<Collection> {
    boolean existsByName(String name);
}
