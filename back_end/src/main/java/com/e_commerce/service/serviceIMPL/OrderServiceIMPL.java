package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.CreateOrderForm;
import com.e_commerce.dto.request.CreateOrderItemForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.*;
import com.e_commerce.repository.IOrderRepository;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderServiceIMPL implements IOrderService {

    private final IOrderRepository orderRepository;
    private final IUserService userService;
    private final ICartItemService cartItemService;
    private final IPaymentWayService paymentWayService;
    private final IProvinceCityService provinceCityService;
    private final IDistrictService districtService;
    private final IWardService wardService;
    private final IOrderItemsService orderItemsService;
    private final ICartService cartService;
    private final IProductOptionsService productOptionsService;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order findById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (!order.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found order at id: " + id);
        }
        return order.get();
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order createNewOrder(CreateOrderForm createOrderForm) {
        User user = userService.findById(createOrderForm.getUserId());

        UserInfo userInfo = user.getUserInfo();
        Cart cart = userInfo.getCart();


//        HANDLE ORDER ITEMS

        double orderTotal = 0;
        Set<OrderItems> orderItems = new HashSet<>();
        Set<ProductOptions> minusStockProductOptions = new HashSet<>();
        Set<CartItems> deleteCartItems = new HashSet<>();
        for (CreateOrderItemForm orderItem : createOrderForm.getOrderItems()) {
            CartItems cartItem = cartItemService.findById(orderItem.getCartItemId());
            if (!cartItem.isStatus()) {
                throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Not match condition cart item");
            }

            PaymentWay paymentWay = paymentWayService.findById(orderItem.getPaymentWayId());

            OrderItems newOrderItem = OrderItems.builder()
                    .productOptions(cartItem.getProductOptions())
                    .price(cartItem.getPrice())
                    .shop(cartItem.getProductOptions().getProduct().getShop())
                    .paymentWay(paymentWay)
                    .status("PREPARE")
                    .quantity(cartItem.getQuantity())
                    .build();

            orderItems.add(newOrderItem);
            cart.setTotal(cart.getTotal() - (cartItem.getPrice() * cartItem.getQuantity()));
            orderTotal = orderTotal + (cartItem.getPrice() * cartItem.getQuantity());


            ProductOptions tempProductOption = cartItem.getProductOptions();
            tempProductOption.setStock(tempProductOption.getStock() - cartItem.getQuantity());
            minusStockProductOptions.add(tempProductOption);


            Set<CartItems> newSetCartItems = cart.getCartItems();
            newSetCartItems.remove(cartItem);
            cart.setCartItems(newSetCartItems);
            deleteCartItems.add(cartItem);
        }

//        ------------------


        ProvinceCity provinceCity = provinceCityService.findById(createOrderForm.getProvinceCityId());

        District district = districtService.findById(createOrderForm.getDistrictId());

        Ward ward = wardService.findById(createOrderForm.getWardId());
        provinceCityService.isDistrictInProvinceCity(provinceCity, district);
        districtService.isWardInDistrict(district, ward);

        Order newOrder = Order.builder()
                .total((orderTotal * 110) / 100)
                .phoneNumber(createOrderForm.getPhoneNumber())
                .receiverName(createOrderForm.getReceiverName())
                .createdDate(LocalDate.now().toString())
                .userInfo(userInfo)
                .provinceCity(provinceCity)
                .district(district)
                .ward(ward)
                .streetDetail(createOrderForm.getStreetDetail())
                .build();

        Order justSavedOrder = save(newOrder);


        for (OrderItems orderItem : orderItems) {
            orderItem.setOrder(justSavedOrder);
            orderItemsService.save(orderItem);
        }

        cartService.save(cart);


        for (CartItems cartItem : deleteCartItems) {
            cartItemService.deleteById(cartItem.getId());
        }

        for (ProductOptions productOption : minusStockProductOptions) {
            productOptionsService.save(productOption);
        }
        return justSavedOrder;
    }
}
