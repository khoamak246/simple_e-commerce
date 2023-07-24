package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateUserAddressForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
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

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findAllProvinceCity(){
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", provinceCityService.findAll()));
    }

    @PostMapping("/user-address")
    public ResponseEntity<ResponseMessage> saveNewUserAddress(@Validated @RequestBody CreateUserAddressForm createUserAddressForm,
                                                              BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        Optional<User> user = userService.findById(createUserAddressForm.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage("Not found user at id: " + createUserAddressForm.getUserId()));
        }

        if (!userService.isUserIdEqualUserPrincipalId(createUserAddressForm.getUserId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user"));
        }


        Optional<ProvinceCity> provinceCity = provinceCityService.findById(createUserAddressForm.getProvinceCityId());
        if (!provinceCity.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found province/city at id: " + createUserAddressForm.getProvinceCityId()));
        }

        Optional<District> district = districtService.findById(createUserAddressForm.getDistrictId());
        if (!district.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district at id: " + createUserAddressForm.getDistrictId()));
        }

        Optional<Ward> ward = wardService.findById(createUserAddressForm.getWardId());
        if (!ward.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward at id: " + createUserAddressForm.getWardId()));
        }

        if (!provinceCity.get().getDistrict().contains(district.get())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + createUserAddressForm.getDistrictId() + " in province/city id: " + createUserAddressForm.getProvinceCityId()));
        }

        if (!district.get().getWard().contains(ward.get())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward with id = " + createUserAddressForm.getWardId() + " in district id: " + createUserAddressForm.getDistrictId()));
        }

        UserAddress newUserAddress = UserAddress.builder()
                .userInfo(user.get().getUserInfo())
                .provinceCity(provinceCity.get())
                .district(district.get())
                .ward(ward.get())
                .streetDetail(createUserAddressForm.getStreetDetail())
                .build();
        userAddressService.save(newUserAddress);
        Set<UserAddress> newSetUserAddresses = userAddressService.findByUserId(createUserAddressForm.getUserId());
        if (newSetUserAddresses != null) {
            return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new user address successfully!", newSetUserAddresses));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Can not return because have not have user match with id: " + createUserAddressForm.getUserId()));
        }
    }


    @PatchMapping("/user-address/{userAddressId}")
    public ResponseEntity<ResponseMessage> updateUserAddress(@RequestBody CreateUserAddressForm createUserAddressForm, @PathVariable Long userAddressId) {
        Optional<UserAddress> userAddress = userAddressService.findById(userAddressId);
        if (!userAddress.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user address at id: " + userAddressId));
        }

        User user = userAddress.get().getUserInfo().getUser();
        if (!userService.isUserIdEqualUserPrincipalId(user.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with user address"));
        }

        if (createUserAddressForm.getStreetDetail() != null) {
            userAddress.get().setStreetDetail(createUserAddressForm.getStreetDetail());
        }

        Long provinceCityId = createUserAddressForm.getProvinceCityId();
        Long districtId = createUserAddressForm.getDistrictId();
        Long wardId = createUserAddressForm.getWardId();
        if (provinceCityId != null && districtId != null && wardId != null) {
            Optional<ProvinceCity> provinceCity = provinceCityService.findById(provinceCityId);
            if (!provinceCity.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found province/city at id: " + provinceCityId));
            }

            Optional<District> district = districtService.findById(districtId);
            if (!district.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district at id: " + districtId));
            }

            Optional<Ward> ward = wardService.findById(wardId);
            if (!ward.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward at id: " + wardId));
            }

            if (!provinceCity.get().getDistrict().contains(district.get())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + districtId + " in province/city id: " + provinceCityId));
            }

            if (!district.get().getWard().contains(ward.get())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward with id = " + wardId + " in district id: " + districtId));
            }

            userAddress.get().setProvinceCity(provinceCity.get());
            userAddress.get().setDistrict(district.get());
            userAddress.get().setWard(ward.get());
        }

        userAddressService.save(userAddress.get());
        Set<UserAddress> newSetUserAddresses = userAddressService.findByUserId(createUserAddressForm.getUserId());
        if (newSetUserAddresses != null) {
            return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new user address successfully!", newSetUserAddresses));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Can not return because have not have user match with id: " + createUserAddressForm.getUserId()));
        }
    }

}
