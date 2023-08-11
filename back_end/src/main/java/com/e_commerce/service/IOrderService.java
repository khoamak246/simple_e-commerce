package com.e_commerce.service;

import com.e_commerce.dto.request.CreateOrderForm;
import com.e_commerce.model.Order;
import com.e_commerce.service.design.IGenericService;

public interface IOrderService extends IGenericService<Order> {
    Order createNewOrder(CreateOrderForm createOrderForm);
}
