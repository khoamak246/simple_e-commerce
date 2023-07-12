package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateShopForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.*;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/shop")
@RequiredArgsConstructor
public class ShopController {
    private final IShopService shopService;
    private final IUserService userService;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;

    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveShop(@Validated @RequestBody CreateShopForm createShopForm, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userPrincipal.getId().equals(createShopForm.getUserId())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user request!"));
        }

        Optional<User> user = userService.findById(createShopForm.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + createShopForm.getUserId()));
        }

        Optional<ProvinceCity> provinceCity = provinceCityService.findById(createShopForm.getProvinceCityId());
        if (!provinceCity.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found province/city at id: " + createShopForm.getProvinceCityId()));
        }

        Optional<District> district = districtService.findById(createShopForm.getDistrictId());
        if (!district.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district at id: " + createShopForm.getDistrictId()));
        }

        Optional<Ward> ward = wardService.findById(createShopForm.getWardId());
        if (!ward.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward at id: " + createShopForm.getWardId()));
        }

        if (!provinceCity.get().getDistrict().contains(district.get())){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + createShopForm.getDistrictId() + " in province/city id: " + createShopForm.getProvinceCityId()));
        }

        if (!district.get().getWard().contains(ward.get())){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward with id = " + createShopForm.getWardId() + " in district id: " + createShopForm.getDistrictId()));
        }


        Shop newShop = Shop.builder()
                .name(createShopForm.getName())
                .createdDate(LocalDate.now().toString())
                .status(true)
                .description("This is your shop description!")
                .streetDetail(createShopForm.getStreetDetail())
                .provinceCity(provinceCity.get())
                .district(district.get())
                .ward(ward.get())
                .user(user.get())
                .build();

        Shop justSavedShop = shopService.save(newShop);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new shop successfully!", justSavedShop));
    }

}
