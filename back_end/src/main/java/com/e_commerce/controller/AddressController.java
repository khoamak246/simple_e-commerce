package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateUserAddressForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/address")
@RequiredArgsConstructor
public class AddressController {

    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;
    private final IUserService userService;
    private final IUserAddressService userAddressService;
    private final IValidateService validateRegex;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findAllProvinceCity(){
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", provinceCityService.findAll()));
    }

    @PostMapping("/user-address")
    public ResponseEntity<ResponseMessage> saveNewUserAddress(@Validated @RequestBody CreateUserAddressForm createUserAddressForm,
                                                              BindingResult result) {
        validateRegex.isValidForm(result);

        User user = userService.findById(createUserAddressForm.getUserId());
        userService.isUserIdEqualUserPrincipalId(createUserAddressForm.getUserId());


        ProvinceCity provinceCity = provinceCityService.findById(createUserAddressForm.getProvinceCityId());
        District district = districtService.findById(createUserAddressForm.getDistrictId());
        Ward ward = wardService.findById(createUserAddressForm.getWardId());

        provinceCityService.isDistrictInProvinceCity(provinceCity, district);
        districtService.isWardInDistrict(district, ward);

        UserAddress newUserAddress = UserAddress.builder()
                .userInfo(user.getUserInfo())
                .provinceCity(provinceCity)
                .district(district)
                .ward(ward)
                .streetDetail(createUserAddressForm.getStreetDetail())
                .build();

        userAddressService.save(newUserAddress);
        Set<UserAddress> newSetUserAddresses = userAddressService.findByUserId(createUserAddressForm.getUserId());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new user address successfully!", newSetUserAddresses));
    }

    @PatchMapping("/user-address/{userAddressId}")
    public ResponseEntity<ResponseMessage> updateUserAddress(@RequestBody CreateUserAddressForm createUserAddressForm, @PathVariable Long userAddressId) {
        UserAddress userAddress = userAddressService.findById(userAddressId);

        User user = userAddress.getUserInfo().getUser();
        userService.isUserIdEqualUserPrincipalId(user.getId());

        UserAddress newUserAddress = userAddressService.updateUserAddressFromForm(userAddress, createUserAddressForm);

        userAddressService.save(newUserAddress);
        Set<UserAddress> newSetUserAddresses = userAddressService.findByUserId(createUserAddressForm.getUserId());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new user address successfully!", newSetUserAddresses));
    }

}
