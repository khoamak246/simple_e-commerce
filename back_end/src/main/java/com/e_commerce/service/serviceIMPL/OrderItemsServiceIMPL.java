package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.OrderStatusForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.OrderItems;
import com.e_commerce.model.Product;
import com.e_commerce.model.Shop;
import com.e_commerce.repository.IOrderItemsRepository;
import com.e_commerce.service.IOrderItemsService;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IShopService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderItemsServiceIMPL implements IOrderItemsService {

    private final IOrderItemsRepository orderItemsRepository;
    private final IShopService shopService;
    private final IProductService productService;

    @Override
    public List<OrderItems> findAll() {
        return orderItemsRepository.findAll();
    }

    @Override
    public OrderItems findById(Long id) {
        Optional<OrderItems> orderItems = orderItemsRepository.findById(id);
        if (!orderItems.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found orderItems at id: " + id);
        }
        return orderItems.get();
    }

    @Override
    public OrderItems save(OrderItems orderItems) {
        return orderItemsRepository.save(orderItems);
    }

    @Override
    public void deleteById(Long id) {
        orderItemsRepository.deleteById(id);
    }

    @Override
    public Set<OrderItems> findByShopId(Long shopId) {
        return orderItemsRepository.findByShopId(shopId);
    }

    @Override
    public Set<OrderItems> findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(Long shopId, String status) {
        return orderItemsRepository.findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(shopId, status);
    }

    @Override
    public OrderItems updateStatusOrderItem(Long orderItemId, OrderStatusForm orderStatusForm) {
        final List<String> statusSet = new ArrayList<>(Arrays.asList("PREPARE", "DONE_PREPARE", "CANCEL", "DELIVERY", "PAYMENT_SUCCESS", "RETURN"));
        OrderItems orderItem = findById(orderItemId);

        Shop shop = orderItem.getShop();
        shopService.isCurrentUserMatchShopUserid(shop.getId());


        int orderItemStatusIndex = statusSet.indexOf(orderItem.getStatus());
        int orderStatusFormStatusIndex = statusSet.indexOf(orderStatusForm.getStatus());

        boolean isFormStatusHigherOrEqualThanCurrentStatus = orderStatusFormStatusIndex >= orderItemStatusIndex;
        boolean isDelivery = orderStatusFormStatusIndex < 0 && orderItemStatusIndex == 3;
        boolean isCancelAbove = orderItemStatusIndex < 0 && orderStatusFormStatusIndex > 3;
        boolean check = isDelivery || isCancelAbove || isFormStatusHigherOrEqualThanCurrentStatus ;
        if (check) {
            if (orderStatusFormStatusIndex == 2 || orderStatusFormStatusIndex == 5) {
                if (orderStatusForm.getNotReceivingReason() == null || orderStatusForm.getNotReceivingReason().length() < 20) {
                    throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Not match reason!");
                } else {
                    orderItem.setNotReceivingReason(orderStatusForm.getNotReceivingReason());
                }
            }
            orderItem.setStatus(orderStatusForm.getStatus());
        }

        Product product = orderItem.getProductOptions().getProduct();
        if (orderStatusFormStatusIndex == 2){
            product.setCancelNumber(product.getCancelNumber() + 1);
        } else if (orderStatusFormStatusIndex == 4){
            product.setSaleNumber(product.getSaleNumber() + 1);
        } else if (orderStatusFormStatusIndex == 5) {
            product.setSaleNumber(product.getSaleNumber() - 1);
            product.setReturnRefundNumber(product.getReturnRefundNumber() + 1);
        }

        OrderItems justSavedOrderItem = save(orderItem);
        productService.save(product);
        return justSavedOrderItem;
    }
}
