package com.e_commerce.service;

import com.e_commerce.model.Product;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface IProductService extends IGenericService<Product> {
    Set<Product> findByNameContainingIgnoreCase(String name);
    Set<Product> createSetProductFromDtoForm(Set<Long> productsDtoForm);
}
