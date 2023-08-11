package com.e_commerce.service;

import com.e_commerce.dto.request.ProductOptionDTO;
import com.e_commerce.dto.request.UpdateProductOptionForm;
import com.e_commerce.model.Product;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface IProductOptionsService extends IGenericService<ProductOptions> {

    Set<ProductOptions> createByProductOptionsForm(Set<ProductOptionDTO> productOptionList,  Product product);
    boolean isValidProductOptionsForm(Set<ProductOptionDTO> productOptionList);

    ProductOptions updateProductOptionsByForm(ProductOptions productOption, UpdateProductOptionForm updateProductOptionForm);
}
