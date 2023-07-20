package com.e_commerce.service;

import com.e_commerce.dto.request.ProductOptionDTO;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface IProductOptionsService extends IGenericService<ProductOptions> {

    Set<ProductOptions> createByProductOptionsForm(Set<ProductOptionDTO> productOptionList);
    boolean isValidProductOptionsForm(Set<ProductOptionDTO> productOptionList);

}
