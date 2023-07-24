package com.e_commerce.controller;

import com.e_commerce.dto.request.AssetCreateForm;
import com.e_commerce.dto.request.CreateShopForm;
import com.e_commerce.dto.request.UpdateShopForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.dto.response.ShopResponse;
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

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
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
    private final IAssetService assetService;

    @PatchMapping("/{shopId}")
    public ResponseEntity<ResponseMessage> patchUpdateShop(@PathVariable Long shopId, @RequestBody UpdateShopForm updateShopForm) {

        Optional<Shop> shop = shopService.findById(shopId);
        if (!shop.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found shop at id: " + shopId));
        }

        if (updateShopForm.getName() != null) {
            if (!ValidationRegex.isMatcherRegex(ValidationRegex.SHOP_NAME_REGEX, updateShopForm.getName())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Not match name"));
            }
            shop.get().setName(updateShopForm.getName());
        }

        if (updateShopForm.getStatus() != null) {
            shop.get().setStatus(updateShopForm.getStatus());
        }

        if (updateShopForm.getAvatar() != null) {
            shop.get().setAvatar(updateShopForm.getAvatar());
        }

        if (updateShopForm.getCoverImg() != null) {
            shop.get().setCoverImg(updateShopForm.getCoverImg());
        }

        if (updateShopForm.getIntroduce() != null && updateShopForm.getIntroduce().size() != 0) {
            Set<Assets> introduce = new HashSet<>();
            for (AssetCreateForm asset : updateShopForm.getIntroduce()) {
                Assets newAsset = Assets.builder()
                        .url(asset.getUrl())
                        .assetType(asset.getAssetType())
                        .build();

                Assets justSavedAsset = assetService.save(newAsset);
                introduce.add(justSavedAsset);
            }
            shop.get().setIntroduce(introduce);
        }

        if (updateShopForm.getDescription() != null) {
            if (updateShopForm.getDescription().length() > 255) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Description size can not over 255 letter!"));
            }
            shop.get().setDescription(updateShopForm.getDescription());
        }

        if (updateShopForm.getStreetDetail() != null) {
            if (updateShopForm.getStreetDetail().length() > 255) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Street detail size can not over 255 letter!"));
            }
            shop.get().setDescription(updateShopForm.getStreetDetail());
        }


        if (updateShopForm.getPaymentWays() != null) {
            Set<PaymentWay> paymentWays = new HashSet<>();
            for (Long paymentWayId : updateShopForm.getPaymentWays()) {
                Optional<PaymentWay> paymentWay = paymentWayService.findById(paymentWayId);
                if (!paymentWay.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found payment way at id: " + paymentWayId));
                }
                paymentWays.add(paymentWay.get());
            }
            shop.get().setPaymentWays(paymentWays);
        }

        Long provinceId = updateShopForm.getProvinceCityId();
        Long districtId = updateShopForm.getDistrictId();
        Long wardId = updateShopForm.getWardId();
        if (provinceId != null || districtId != null || wardId != null) {
            if (!(provinceId != null && districtId != null && wardId != null)) {
                return ResponseEntity.badRequest().body(Utils.buildFailMessage("Province id or district id or ward id is null"));
            }

            Optional<ProvinceCity> provinceCity = provinceCityService.findById(provinceId);
            if (!provinceCity.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found province/city at id: " + provinceId));
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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + districtId + " in province/city id: " + provinceId));
            }

            if (!district.get().getWard().contains(ward.get())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward with id = " + wardId + " in district id: " + districtId));
            }

            shop.get().setProvinceCity(provinceCity.get());
            shop.get().setDistrict(district.get());
            shop.get().setWard(ward.get());
        }

        Shop justSavedShop = shopService.save(shop.get());

        ShopResponse shopResponse = shopService.createShopResponse(justSavedShop);

        return ResponseEntity.ok().body(Utils.buildSuccessMessage("update shop successfully!", shopResponse));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseMessage> findShopByUserId(@PathVariable Long userId) {
        if (!userService.isUserIdEqualUserPrincipalId(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user request!"));
        }

        Optional<Shop> shop = shopService.findByUserId(userId);
        if (!shop.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found shop at user id: " + userId));
        }

        ShopResponse shopResponse = shopService.createShopResponse(shop.get());

        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", shopResponse));
    }

    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveShop(@Validated @RequestBody CreateShopForm createShopForm, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }


        if (!userService.isUserIdEqualUserPrincipalId(createShopForm.getUserId())) {
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

        if (!provinceCity.get().getDistrict().contains(district.get())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + createShopForm.getDistrictId() + " in province/city id: " + createShopForm.getProvinceCityId()));
        }

        if (!district.get().getWard().contains(ward.get())) {
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
                .avatar("https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/defaultAvatar.jpg?alt=media&token=156e7504-89ab-41e0-b185-864196000f98")
                .coverImg("https://firebasestorage.googleapis.com/v0/b/simple-e-commerce-8bfc6.appspot.com/o/default-cover-4.jpeg?alt=media&token=67ccde44-bd3e-4798-88c1-a3670a9e0100")
                .ward(ward.get())
                .paymentWays(new HashSet<>(paymentWayService.findAll()))
                .user(user.get())
                .build();

        Shop justSavedShop = shopService.save(newShop);
        ShopResponse shopResponse = shopService.createShopResponse(justSavedShop);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new shop successfully!", shopResponse));
    }

}
