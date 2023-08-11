package com.e_commerce.service;

import com.e_commerce.dto.request.CategoriesSearchForm;
import com.e_commerce.dto.request.CreateBusinessForm;
import com.e_commerce.model.Business;
import com.e_commerce.model.Product;
import com.e_commerce.service.design.IGenericService;

import java.util.List;
import java.util.Set;

public interface IBusinessService extends IGenericService<Business> {
    Set<Business> findByBusinessIsEmpty();
    Set<Business> findByNameContainingIgnoreCase(String name);
    List<Product> findProductByBusinessId(Long businessId);
    Set<Product> searchValueByCategoriesSearchForm(CategoriesSearchForm categoriesSearchForm);
    Business createSubBusinessFromFormAndBusinessId(Long businessId, CreateBusinessForm createBusinessForm);
}
