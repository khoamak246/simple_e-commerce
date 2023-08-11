package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.AssetCreateForm;
import com.e_commerce.dto.request.UpdateShopForm;
import com.e_commerce.dto.response.*;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.*;
import com.e_commerce.repository.IOrderItemsRepository;
import com.e_commerce.repository.IShopRepository;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.*;
import com.e_commerce.utils.constant.ValidationRegex;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopServiceIMPL implements IShopService {

    private final IShopRepository shopRepository;
    private final IOrderItemsRepository orderItemsRepository;
    private final IProductService productService;
    private final IAssetService assetService;
    private final IPaymentWayService paymentWayService;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;

    @Override
    public List<Shop> findAll() {
        return shopRepository.findAll();
    }

    @Override
    public Shop findById(Long id) {
        Optional<Shop> shop = shopRepository.findById(id);
        if (!shop.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found shop at id: " + id);
        }
        return shop.get();
    }

    @Override
    public Shop save(Shop shop) {
        return shopRepository.save(shop);
    }

    @Override
    public void deleteById(Long id) {
        shopRepository.deleteById(id);
    }

    @Override
    public Shop findByUserId(Long userId) {
        Optional<Shop> shop = shopRepository.findByUserId(userId);
        if (!shop.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found shop at user id: " + userId);
        }
        return shop.get();
    }

    @Override
    public boolean isCurrentUserMatchShopUserid(Long shopId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Shop shop = findById(shopId);
        if (!shop.getUser().getId().equals(currentUser.getId())) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Not match user with shop id: " + shopId);
        }
        return true;
    }

    @Override
    public ShopResponse createShopResponse(Shop shop) {
        Set<OrderItems> orderItems = orderItemsRepository.findByShopId(shop.getId());
        Set<OrderItems> waitingConfirmations = new HashSet<>();
        Set<OrderItems> goodsWaitingConfirmations = new HashSet<>();
        Set<OrderItems> doneProcessingOrderItems = new HashSet<>();
        Set<OrderItems> cancelOrderItems = new HashSet<>();
        Set<OrderItems> returnOrderItems = new HashSet<>();
        Set<OrderItems> deliveryOrderItems = new HashSet<>();
        for (OrderItems orderItem : orderItems) {
            switch (orderItem.getStatus()) {
                case "PREPARE":
                    waitingConfirmations.add(orderItem);
                    break;
                case "DONE_PREPARE":
                    goodsWaitingConfirmations.add(orderItem);
                    break;
                case "PAYMENT_SUCCESS":
                    doneProcessingOrderItems.add(orderItem);
                    break;
                case "CANCEL":
                    cancelOrderItems.add(orderItem);
                    break;
                case "RETURN":
                    returnOrderItems.add(orderItem);
                    break;
                default:
                    deliveryOrderItems.add(orderItem);
                    break;
            }
        }

        double rate = 0;
        int countHaveRateProduct = 0;
        int reviewNumber = 0;
        for (Product product : shop.getProducts()) {
            if (product.getRate() != 0){
                countHaveRateProduct = countHaveRateProduct + 1;
            }
            rate = rate + product.getRate();
            reviewNumber = reviewNumber + product.getReviewNumber();
        }

        if (countHaveRateProduct == 0) {
            countHaveRateProduct = 1;
        }




        return ShopResponse.builder()
                .id(shop.getId())
                .name(shop.getName())
                .createdDate(shop.getCreatedDate())
                .status(shop.getStatus())
                .avatar(shop.getAvatar())
                .coverImg(shop.getCoverImg())
                .introduce(shop.getIntroduce())
                .description(shop.getDescription())
                .streetDetail(shop.getStreetDetail())
                .provinceCity(shop.getProvinceCity())
                .district(shop.getDistrict())
                .ward(shop.getWard())
                .visitNumber(shop.getVisitNumber())
                .rate(rate / countHaveRateProduct)
                .reviewNumber(reviewNumber)
                .orderItems(orderItems)
                .cancelOrderItems(cancelOrderItems)
                .returnOrderItems(returnOrderItems)
                .waitingConfirmations(waitingConfirmations)
                .goodsWaitingConfirmations(goodsWaitingConfirmations)
                .doneProcessingOrderItems(doneProcessingOrderItems)
                .deliveryOrderItems(deliveryOrderItems)
                .followers(shop.getFollowers())
                .products(shop.getProducts())
                .paymentWays(shop.getPaymentWays())
                .collections(shop.getCollections())
                .build();

    }

    @Override
    public int countNumberFollowerShop(Long shopId) {
        Integer count = shopRepository.countNumberFollowerShop(shopId);
        return count == null ? 0: count;
    }

    @Override
    public double sumRevenueShop(Long shopId) {
        Double sum = shopRepository.sumRevenueShop(shopId);
        return sum == null ? 0 : sum;
    }

    @Override
    public Set<ShopRevenueResponse> sumRevenueEachMonthShop(Long shopId, int year) {
        return shopRepository.sumRevenueEachMonthShop(shopId, year);
    }

    @Override
    @Transactional
    public SaleManagementResponse getSaleManagementByShopId(Long shopId) {
        isCurrentUserMatchShopUserid(shopId);
        ProductResponse defaultProductResponse = ProductResponse.builder()
                .id(-1L)
                .data(0)
                .name("")
                .build();
        int productNumber = productService.countByShopId(shopId);
        ProductResponse maxCancelOrderPercentProduct = productService.findProductHaveMaxCancelOrderPercent(shopId).orElse(defaultProductResponse);
        ProductResponse maxReturnOrderPercentProduct = productService.findProductHaveMaxReturnOrderPercent(shopId).orElse(defaultProductResponse);
        int FollowerNumber = countNumberFollowerShop(shopId);
        Set<ProductResponse> top10ProductMaxOrder = productService.findTop10ProductHaveMaxNumberOrder(shopId);
        Set<ProductResponse> top10ProductMaxFavorites = productService.findTop10ProductHaveMaxFavorites(shopId);
        Set<ProductResponse> top10ProductMaxVisitNumber = productService.findTop10ByShopIdOrderByVisitNumberDesc(shopId).stream()
                .map(e ->
                        ProductResponse.builder()
                                .id(e.getId())
                                .name(e.getName())
                                .data(e.getVisitNumber())
                                .build()).collect(Collectors.toSet());
        Set<ProductResponse> top5ProductMaxRevenue = productService.findTopFiveProductHaveMaxRevenue(shopId);
        return SaleManagementResponse.builder()
                .productNumber(productNumber)
                .maxCancelOrderPercentProduct(maxCancelOrderPercentProduct)
                .maxReturnOrderPercentProduct(maxReturnOrderPercentProduct)
                .FollowerNumber(FollowerNumber)
                .top10ProductMaxOrder(top10ProductMaxOrder)
                .top10ProductMaxFavorites(top10ProductMaxFavorites)
                .top10ProductMaxVisitNumber(top10ProductMaxVisitNumber)
                .top5ProductMaxRevenue(top5ProductMaxRevenue)
                .type("saleMng")
                .build();
    }

    @Override
    @Transactional
    public RevenueManagementResponse getRevenueManagementShop(Long shopId, int year) {
        isCurrentUserMatchShopUserid(shopId);
        double totalRevenue = sumRevenueShop(shopId);
        Set<OrderItems> top10Revenue = orderItemsRepository.findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(shopId, "PAYMENT_SUCCESS");
        Set<ShopRevenueResponse> sumRevenueEachMonthShop = sumRevenueEachMonthShop(shopId, year);
        return RevenueManagementResponse.builder()
                .totalRevenue(totalRevenue)
                .top10Revenue(top10Revenue)
                .sumRevenueEachMonthShop(sumRevenueEachMonthShop)
                .type("revenueMng")
                .build();
    }

    @Override
    public Shop updateShopFromFormAndShopId(Long shopId, UpdateShopForm updateShopForm) {
        Shop shop = findById(shopId);

        if (updateShopForm.getName() != null) {
            if (!ValidationRegex.isMatcherRegex(ValidationRegex.SHOP_NAME_REGEX, updateShopForm.getName())) {
                throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Not match name");
            }
            shop.setName(updateShopForm.getName());
        }

        if (updateShopForm.getStatus() != null) {
            shop.setStatus(updateShopForm.getStatus());
        }

        if (updateShopForm.getAvatar() != null) {
            shop.setAvatar(updateShopForm.getAvatar());
        }

        if (updateShopForm.getCoverImg() != null) {
            shop.setCoverImg(updateShopForm.getCoverImg());
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
            shop.setIntroduce(introduce);
        }

        if (updateShopForm.getDescription() != null) {
            if (updateShopForm.getDescription().length() > 255) {
                throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Description size can not over 255 letter!");
            }
            shop.setDescription(updateShopForm.getDescription());
        }

        if (updateShopForm.getStreetDetail() != null) {
            if (updateShopForm.getStreetDetail().length() > 255) {
                throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Street detail size can not over 255 letter!");
            }
            shop.setDescription(updateShopForm.getStreetDetail());
        }


        if (updateShopForm.getPaymentWays() != null) {
            Set<PaymentWay> paymentWays = new HashSet<>();
            for (Long paymentWayId : updateShopForm.getPaymentWays()) {
                PaymentWay paymentWay = paymentWayService.findById(paymentWayId);
                paymentWays.add(paymentWay);
            }
            shop.setPaymentWays(paymentWays);
        }

        Long provinceId = updateShopForm.getProvinceCityId();
        Long districtId = updateShopForm.getDistrictId();
        Long wardId = updateShopForm.getWardId();
        if (provinceId != null || districtId != null || wardId != null) {
            if (!(provinceId != null && districtId != null && wardId != null)) {
                throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Province id or district id or ward id is null");
            }
            ProvinceCity provinceCity = provinceCityService.findById(provinceId);
            District district = districtService.findById(districtId);
            Ward ward = wardService.findById(wardId);
            provinceCityService.isDistrictInProvinceCity(provinceCity, district);
            districtService.isWardInDistrict(district, ward);
            shop.setProvinceCity(provinceCity);
            shop.setDistrict(district);
            shop.setWard(ward);
        }

       return shop;
    }

    @Override
    public Set<User> updateFollower(User user, Shop shop) {
        List<User> userList = new ArrayList<>(shop.getFollowers());
        if (userList.contains(user)) {
            userList.remove(user);
        } else {
            userList.add(user);
        }

        return new HashSet<>(userList);
    }

}
