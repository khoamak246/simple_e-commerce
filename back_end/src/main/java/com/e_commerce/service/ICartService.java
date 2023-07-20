package com.e_commerce.service;

import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.service.design.IGenericService;

public interface ICartService extends IGenericService<Cart> {
    boolean isMatchCartWithCurrentUser(Cart cart);
    CartItems findByCartItemInCart(Cart cart ,Long productOptionsId);
}
