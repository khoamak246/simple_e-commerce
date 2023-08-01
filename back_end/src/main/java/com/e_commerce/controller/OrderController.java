package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateOrderForm;
import com.e_commerce.dto.request.CreateOrderItemForm;
import com.e_commerce.dto.request.OrderStatusForm;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IOrderItemsService orderItemService;
    private final ICartItemService cartItemService;
    private final ICartService cartService;
    private final IPaymentWayService paymentWayService;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;
    private final IUserService userService;
    private final IProductOptionsService productOptionsService;
    private final IShopService shopService;
    private final IProductService productService;

    @PatchMapping("/orderItem/{orderItemId}/status")
    public ResponseEntity<ResponseMessage> updateStatusOrderItem(@PathVariable Long orderItemId,
                                                                 @Validated @RequestBody OrderStatusForm orderStatusForm,
                                                                 BindingResult result) {

        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        final List<String> statusSet = new ArrayList<>(Arrays.asList("PREPARE", "DONE_PREPARE", "CANCEL", "DELIVERY", "PAYMENT_SUCCESS", "RETURN"));
        Optional<OrderItems> orderItem = orderItemService.findById(orderItemId);
        if (!orderItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found order item at id: " + orderItemId));
        }

        Shop shop = orderItem.get().getShop();
        if (!shopService.isCurrentUserMatchShopUserid(shop.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with shop"));
        }


        int orderItemStatusIndex = statusSet.indexOf(orderItem.get().getStatus());
        int orderStatusFormStatusIndex = statusSet.indexOf(orderStatusForm.getStatus());

        boolean isFormStatusHigherOrEqualThanCurrentStatus = orderStatusFormStatusIndex >= orderItemStatusIndex;
        boolean isDelivery = orderStatusFormStatusIndex < 0 && orderItemStatusIndex == 3;
        boolean isCancelAbove = orderItemStatusIndex < 0 && orderStatusFormStatusIndex > 3;
        boolean check = isDelivery || isCancelAbove || isFormStatusHigherOrEqualThanCurrentStatus ;
        if (check) {
            if (orderStatusFormStatusIndex == 2 || orderStatusFormStatusIndex == 5) {
                if (orderStatusForm.getNotReceivingReason() == null || orderStatusForm.getNotReceivingReason().length() < 20) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Not match reason!"));
                } else {
                   orderItem.get().setNotReceivingReason(orderStatusForm.getNotReceivingReason());
                }
            }
            orderItem.get().setStatus(orderStatusForm.getStatus());
        }

        Product product = orderItem.get().getProductOptions().getProduct();
        if (orderStatusFormStatusIndex == 2){
            product.setCancelNumber(product.getCancelNumber() + 1);
        } else if (orderStatusFormStatusIndex == 4){
            product.setSaleNumber(product.getSaleNumber() + 1);
        } else if (orderStatusFormStatusIndex == 5) {
            product.setSaleNumber(product.getSaleNumber() - 1);
            product.setReturnRefundNumber(product.getReturnRefundNumber() + 1);
        }

        OrderItems justSavedOrderItem = orderItemService.save(orderItem.get());
        productService.save(product);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update order item successfully!", justSavedOrderItem));
    }

    @PostMapping("")
    @Transactional
    public ResponseEntity<ResponseMessage> saveNewOrder(@Validated @RequestBody CreateOrderForm createOrderForm, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        if (!userService.isUserIdEqualUserPrincipalId(createOrderForm.getUserId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Not match with current user!"));
        }

        Optional<User> user = userService.findById(createOrderForm.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + createOrderForm.getUserId()));
        }

        UserInfo userInfo = user.get().getUserInfo();
        Cart cart = userInfo.getCart();


//        HANDLE ORDER ITEMS

        double orderTotal = 0;
        Set<OrderItems> orderItems = new HashSet<>();
        Set<ProductOptions> minusStockProductOptions = new HashSet<>();
        Set<CartItems> deleteCartItems = new HashSet<>();
        for (CreateOrderItemForm orderItem : createOrderForm.getOrderItems()) {
            Optional<CartItems> cartItem = cartItemService.findById(orderItem.getCartItemId());
            if (!cartItem.isPresent() || !cartItem.get().isStatus()) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match condition cart item"));
            }

            Optional<PaymentWay> paymentWay = paymentWayService.findById(orderItem.getPaymentWayId());
            if (!paymentWay.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found payment way at id: " + orderItem.getPaymentWayId()));
            }

            OrderItems newOrderItem = OrderItems.builder()
                    .productOptions(cartItem.get().getProductOptions())
                    .price(cartItem.get().getPrice())
                    .shop(cartItem.get().getProductOptions().getProduct().getShop())
                    .paymentWay(paymentWay.get())
                    .status("PREPARE")
                    .quantity(cartItem.get().getQuantity())
                    .build();

            orderItems.add(newOrderItem);
            cart.setTotal(cart.getTotal() - (cartItem.get().getPrice() * cartItem.get().getQuantity()));
            orderTotal = orderTotal + (cartItem.get().getPrice() * cartItem.get().getQuantity());


            ProductOptions tempProductOption = cartItem.get().getProductOptions();
            tempProductOption.setStock(tempProductOption.getStock() - cartItem.get().getQuantity());
            minusStockProductOptions.add(tempProductOption);


            Set<CartItems> newSetCartItems = cart.getCartItems();
            newSetCartItems.remove(cartItem.get());
            cart.setCartItems(newSetCartItems);
            deleteCartItems.add(cartItem.get());
        }

//        ------------------


        Optional<ProvinceCity> provinceCity = provinceCityService.findById(createOrderForm.getProvinceCityId());
        if (!provinceCity.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found province/city at id: " + createOrderForm.getProvinceCityId()));
        }

        Optional<District> district = districtService.findById(createOrderForm.getDistrictId());
        if (!district.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district at id: " + createOrderForm.getDistrictId()));
        }

        Optional<Ward> ward = wardService.findById(createOrderForm.getWardId());
        if (!ward.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward at id: " + createOrderForm.getWardId()));
        }

        if (!provinceCity.get().getDistrict().contains(district.get())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found district with id = " + createOrderForm.getDistrictId() + " in province/city id: " + createOrderForm.getProvinceCityId()));
        }

        if (!district.get().getWard().contains(ward.get())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found ward with id = " + createOrderForm.getWardId() + " in district id: " + createOrderForm.getDistrictId()));
        }

        Order newOrder = Order.builder()
                .total((orderTotal * 110) / 100)
                .phoneNumber(createOrderForm.getPhoneNumber())
                .receiverName(createOrderForm.getReceiverName())
                .createdDate(LocalDate.now().toString())
                .userInfo(userInfo)
                .provinceCity(provinceCity.get())
                .district(district.get())
                .ward(ward.get())
                .streetDetail(createOrderForm.getStreetDetail())
                .build();

        Order justSavedOrder = orderService.save(newOrder);


        for (OrderItems orderItem : orderItems) {
            orderItem.setOrder(justSavedOrder);
            orderItemService.save(orderItem);
        }

        cartService.save(cart);


        for (CartItems cartItem : deleteCartItems) {
            cartItemService.deleteById(cartItem.getId());
        }

        for (ProductOptions productOption : minusStockProductOptions) {
            productOptionsService.save(productOption);
        }

        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new order successfully!", justSavedOrder));
    }

}
