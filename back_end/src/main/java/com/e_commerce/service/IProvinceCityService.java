package com.e_commerce.service;

import com.e_commerce.model.District;
import com.e_commerce.model.ProvinceCity;
import com.e_commerce.service.design.IGenericService;

public interface IProvinceCityService extends IGenericService<ProvinceCity> {

    boolean isDistrictInProvinceCity(ProvinceCity provinceCity, District district);

}
