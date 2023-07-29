package com.e_commerce.service;

import com.e_commerce.model.Business;
import com.e_commerce.service.design.IGenericService;

import java.util.Optional;
import java.util.Set;

public interface IBusinessService extends IGenericService<Business> {
    Set<Business> findByBusinessIsEmpty();
}
