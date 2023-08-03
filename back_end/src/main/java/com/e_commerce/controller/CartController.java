package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateCartItemForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.model.User;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final ICartService cartService;
    private final ICartItemService cartItemService;
    private final IUserService userService;
    private final IValidateService validateRegex;

    @GetMapping("/cartItems/user/{userId}/over-stock-cart-items")
    public ResponseEntity<ResponseMessage> findOverStockCartItems(@PathVariable Long userId) {
        userService.isUserIdEqualUserPrincipalId(userId);
        User user = userService.findById(userId);
        Set<CartItems> cartItems = cartService.removeOverStockCartItems(user.getUserInfo().getCart().getCartItems());
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully", cartItems));
    }

    @PatchMapping("/cartItems/{cartItemId}/status")
    public ResponseEntity<ResponseMessage> updateStatusCartItem(@PathVariable Long cartItemId) {
        CartItems cartItem = cartItemService.findById(cartItemId);
        Cart cart = cartItem.getCart();
        cartService.isMatchCartWithCurrentUser(cart);
        cartItem.setStatus(!cartItem.isStatus());
        cartItemService.save(cartItem);
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update cart item successfully!", cart));
    }

    @PatchMapping("/cartItems/{cartId}/all-status/{status}")
    public ResponseEntity<ResponseMessage> updateStatusAllCartItem(@PathVariable Long cartId, @PathVariable boolean status) {
        Cart cart = cartService.findById(cartId);
        User user = cart.getUserInfo().getUser();
        userService.isUserIdEqualUserPrincipalId(user.getId());
        Cart afterUpdateStatusCart = cartService.updateStatusAllCartItem(cart, status);
        Cart justSavedCart = cartService.save(afterUpdateStatusCart);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update cart successfully!", justSavedCart));
    }

    @DeleteMapping("/cartItems/{cartItemId}")
    public ResponseEntity<ResponseMessage> deleteCartItemsAndUpdateCartTotal(@PathVariable Long cartItemId) {
        Cart justSavedCart = cartService.deleteCartItemsAndUpdateCartTotal(cartItemId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Delete cart item successfully!", justSavedCart));
    }

    @PatchMapping("/cartItems/{cartItemId}")
    public ResponseEntity<ResponseMessage> minusCartItemsQuantity(@PathVariable Long cartItemId) {
        Cart justSavedCart = cartService.minusQuantityCartItemInCart(cartItemId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Update cart item successfully!", justSavedCart));
    }

    @PostMapping("/{cartId}/cartItems")
    public ResponseEntity<ResponseMessage> saveNewCartItem(@PathVariable Long cartId, @Validated @RequestBody CreateCartItemForm createCartItemForm, BindingResult result){
        validateRegex.isValidForm(result);
        Cart justSavedCart = cartService.saveNewCartItemToCartFromForm(cartId, createCartItemForm);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Add new cart item successfully!", justSavedCart));
    }

}
