package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.response.ShopResponse;
import com.e_commerce.model.OrderItems;
import com.e_commerce.model.Product;
import com.e_commerce.model.Shop;
import com.e_commerce.repository.IShopRepository;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.IOrderItemsService;
import com.e_commerce.service.IShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ShopServiceIMPL implements IShopService {

    private final IShopRepository shopRepository;
    private final IOrderItemsService orderItemsService;

    @Override
    public List<Shop> findAll() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Shop> findById(Long id) {
        return shopRepository.findById(id);
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
    public Optional<Shop> findByUserId(Long userId) {
        return shopRepository.findByUserId(userId);
    }

    @Override
    public boolean isCurrentUserMatchShopUserid(Long shopId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Shop> shop = findById(shopId);
        return shop.map(value -> value.getUser().getId().equals(currentUser.getId())).orElse(false);

    }

    @Override
    public ShopResponse createShopResponse(Shop shop) {
        Set<OrderItems> orderItems = orderItemsService.findByShopId(shop.getId());
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
        int reviewNumber = 0;
        for (Product product : shop.getProducts()) {
            rate = rate + product.getRate();
            reviewNumber = reviewNumber + product.getReviewNumber();
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
                .rate(rate / shop.getProducts().size())
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
}
