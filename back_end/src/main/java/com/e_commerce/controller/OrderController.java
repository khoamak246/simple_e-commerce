package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateOrderForm;
import com.e_commerce.dto.request.OrderStatusForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Order;
import com.e_commerce.model.OrderItems;
import com.e_commerce.service.IOrderItemsService;
import com.e_commerce.service.IOrderService;
import com.e_commerce.service.IUserService;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IOrderItemsService orderItemService;
    private final IUserService userService;
    private final IValidateService validateRegex;

    @PatchMapping("/orderItem/{orderItemId}/status")
    public ResponseEntity<ResponseMessage> updateStatusOrderItem(@PathVariable Long orderItemId,
                                                                 @Validated @RequestBody OrderStatusForm orderStatusForm,
                                                                 BindingResult result) {
        validateRegex.isValidForm(result);
        OrderItems justSavedOrderItem = orderItemService.updateStatusOrderItem(orderItemId, orderStatusForm);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update order item successfully!", justSavedOrderItem));
    }

    @PostMapping("")
    @Transactional
    public ResponseEntity<ResponseMessage> saveNewOrder(@Validated @RequestBody CreateOrderForm createOrderForm, BindingResult result) {
        validateRegex.isValidForm(result);
        userService.isUserIdEqualUserPrincipalId(createOrderForm.getUserId());
        Order order = orderService.createNewOrder(createOrderForm);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new order successfully!", order));
    }

}
