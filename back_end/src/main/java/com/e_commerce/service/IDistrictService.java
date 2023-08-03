package com.e_commerce.service;

import com.e_commerce.model.District;
import com.e_commerce.model.Ward;
import com.e_commerce.service.design.IGenericService;


public interface IDistrictService extends IGenericService<District> {
    boolean isWardInDistrict(District district, Ward ward);
}
