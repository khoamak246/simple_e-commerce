package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateShopForm;
import com.e_commerce.dto.request.UpdateShopForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.dto.response.RevenueManagementResponse;
import com.e_commerce.dto.response.SaleManagementResponse;
import com.e_commerce.dto.response.ShopResponse;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/shop")
@RequiredArgsConstructor
public class ShopController {
    private final IShopService shopService;
    private final IUserService userService;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;
    private final IPaymentWayService paymentWayService;
    private final IValidateService validateRegex;

    @GetMapping("/{shopId}")
    public ResponseEntity<ResponseMessage> findShopById(@PathVariable Long shopId) {
        Shop shop = shopService.findById(shopId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", shop));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseMessage> findShopByUserId(@PathVariable Long userId) {
        userService.isUserIdEqualUserPrincipalId(userId);
        Shop shop = shopService.findByUserId(userId);
        ShopResponse shopResponse = shopService.createShopResponse(shop);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", shopResponse));
    }

    @GetMapping("/sale-management/{shopId}")
    @Transactional
    public ResponseEntity<ResponseMessage> getSaleManagementByShopId(@PathVariable Long shopId) {
        SaleManagementResponse saleManagementResponse = shopService.getSaleManagementByShopId(shopId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", saleManagementResponse));
    }

    @GetMapping("/revenue-management/{shopId}/{year}")
    @Transactional
    public ResponseEntity<ResponseMessage> getRevenueManagementShop(@PathVariable Long shopId, @PathVariable int year) {
        RevenueManagementResponse revenueManagementResponse = shopService.getRevenueManagementShop(shopId,year);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", revenueManagementResponse));
    }

    @PatchMapping("/{shopId}")
    public ResponseEntity<ResponseMessage> patchUpdateShop(@PathVariable Long shopId, @RequestBody UpdateShopForm updateShopForm) {

        Shop shop = shopService.updateShopFromFormAndShopId(shopId, updateShopForm);
        Shop justSavedShop = shopService.save(shop);
        ShopResponse shopResponse = shopService.createShopResponse(justSavedShop);

        return ResponseEntity.ok().body(Utils.buildSuccessMessage("update shop successfully!", shopResponse));
    }


    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveShop(@Validated @RequestBody CreateShopForm createShopForm, BindingResult result) {
        validateRegex.isValidForm(result);
        userService.isUserIdEqualUserPrincipalId(createShopForm.getUserId());
        User user = userService.findById(createShopForm.getUserId());

        ProvinceCity provinceCity = provinceCityService.findById(createShopForm.getProvinceCityId());
        District district = districtService.findById(createShopForm.getDistrictId());
        Ward ward = wardService.findById(createShopForm.getWardId());
        provinceCityService.isDistrictInProvinceCity(provinceCity, district);
        districtService.isWardInDistrict(district, ward);

        Shop newShop = Shop.builder()
                .name(createShopForm.getName())
                .createdDate(LocalDate.now().toString())
                .status(true)
                .description("This is your shop description!")
                .streetDetail(createShopForm.getStreetDetail())
                .provinceCity(provinceCity)
                .district(district)
                .avatar("https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/defaultAvatar.jpg?alt=media&token=156e7504-89ab-41e0-b185-864196000f98")
                .coverImg("https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/default-cover-4.jpeg?alt=media&token=67ccde44-bd3e-4798-88c1-a3670a9e0100")
                .ward(ward)
                .paymentWays(new HashSet<>(paymentWayService.findAll()))
                .user(user)
                .introduce(new HashSet<>())
                .orderItems(new HashSet<>())
                .followers(new HashSet<>())
                .products(new HashSet<>())
                .collections(new HashSet<>())
                .build();

        Shop justSavedShop = shopService.save(newShop);
        ShopResponse shopResponse = shopService.createShopResponse(justSavedShop);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new shop successfully!", shopResponse));
    }

    @PostMapping("/follower/{shopId}/{userId}")
    public ResponseEntity<ResponseMessage> saveFollower(@PathVariable Long userId, @PathVariable Long shopId) {
        userService.isUserIdEqualUserPrincipalId(userId);

        User user = userService.findById(userId);
        Shop shop = shopService.findById(shopId);
        Set<User> newSetFollower = shopService.updateFollower(user, shop);
        shop.setFollowers(newSetFollower);
        Shop justSavedShop = shopService.save(shop);
        ShopResponse shopResponse = shopService.createShopResponse(justSavedShop);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new shop successfully!", shopResponse));
    }
}
