package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.CreateUserAddressForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.*;
import com.e_commerce.repository.IUserAddressRepository;
import com.e_commerce.repository.IUserRepository;
import com.e_commerce.service.IDistrictService;
import com.e_commerce.service.IProvinceCityService;
import com.e_commerce.service.IUserAddressService;
import com.e_commerce.service.IWardService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserAddressServiceIMPL implements IUserAddressService {

    private final IUserAddressRepository userAddressRepository;
    private final IUserRepository userRepository;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;

    @Override
    public List<UserAddress> findAll() {
        return userAddressRepository.findAll();
    }

    @Override
    public UserAddress findById(Long id) {
        Optional<UserAddress> userAddress = userAddressRepository.findById(id);
        if (!userAddress.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found userAddress at id: " + id);
        }
        return userAddress.get();
    }

    @Override
    public UserAddress save(UserAddress userAddress) {
        return userAddressRepository.save(userAddress);
    }

    @Override
    public void deleteById(Long id) {
    userAddressRepository.deleteById(id);
    }

    @Override
    public Set<UserAddress> findByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        Set<UserAddress> userAddresses = user.map(value -> userAddressRepository.findByUserInfoId(value.getUserInfo().getId()))
                .orElse(null);

        if (userAddresses != null) {
            return userAddresses;
        } else {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Can not return because have not have user match with id: " + userId);
        }
    }

    @Override
    public UserAddress updateUserAddressFromForm(UserAddress userAddress, CreateUserAddressForm createUserAddressForm) {

        if (createUserAddressForm.getStreetDetail() != null) {
            userAddress.setStreetDetail(createUserAddressForm.getStreetDetail());
        }

        Long provinceCityId = createUserAddressForm.getProvinceCityId();
        Long districtId = createUserAddressForm.getDistrictId();
        Long wardId = createUserAddressForm.getWardId();
        if (provinceCityId != null && districtId != null && wardId != null) {

            ProvinceCity provinceCity = provinceCityService.findById(provinceCityId);
            District district = districtService.findById(districtId);
            Ward ward = wardService.findById(wardId);

            provinceCityService.isDistrictInProvinceCity(provinceCity, district);
            districtService.isWardInDistrict(district, ward);

            userAddress.setProvinceCity(provinceCity);
            userAddress.setDistrict(district);
            userAddress.setWard(ward);
        }

        return userAddress;
    }
}
