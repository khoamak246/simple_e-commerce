package com.e_commerce.service;


import com.e_commerce.dto.request.CreateUserAddressForm;
import com.e_commerce.model.UserAddress;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface IUserAddressService extends IGenericService<UserAddress> {

    Set<UserAddress> findByUserId(Long userId);

    UserAddress updateUserAddressFromForm(UserAddress userAddress, CreateUserAddressForm createUserAddressForm);

}
