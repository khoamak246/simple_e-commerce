package com.e_commerce.service;

import com.e_commerce.dto.request.CreateCartItemForm;
import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.service.design.IGenericService;

import java.util.Set;

public interface ICartService extends IGenericService<Cart> {
    boolean isMatchCartWithCurrentUser(Cart cart);
    CartItems findByCartItemInCart(Cart cart ,Long productOptionsId);
    Set<CartItems> removeOverStockCartItems(Set<CartItems> cartItems);
    Cart updateStatusAllCartItem(Cart cart, boolean status);
    Cart deleteCartItemsAndUpdateCartTotal(Long cartItemId);
    Cart minusQuantityCartItemInCart(Long cartItemId);
    Cart saveNewCartItemToCartFromForm(Long cartId, CreateCartItemForm createCartItemForm);
}
