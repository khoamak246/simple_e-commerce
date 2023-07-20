package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateCartItemForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.model.User;
import com.e_commerce.service.ICartItemService;
import com.e_commerce.service.ICartService;
import com.e_commerce.service.IProductOptionsService;
import com.e_commerce.service.IUserService;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final ICartService cartService;
    private final IProductOptionsService productOptionsService;
    private final ICartItemService cartItemService;
    private final IUserService userService;

    @GetMapping("/cartItems/user/{userId}/over-stock-cart-items")
    public ResponseEntity<ResponseMessage> findOverStockCartItems(@PathVariable Long userId) {
        if (!userService.isUserIdEqualUserPrincipalId(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match current user with cart!"));
        }

        Optional<User> user = userService.findById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + userId));
        }

        Set<CartItems> cartItems = user.get().getUserInfo().getCart().getCartItems();
        Set<CartItems> overStockCartItems = new HashSet<>();
        for (CartItems cartItem: cartItems){
            int stock = cartItem.getProductOptions().getStock();
            if (cartItem.getQuantity() > stock) {
                cartItem.setQuantity(stock);
                CartItems justSavedCartItem = cartItemService.save(cartItem);
                overStockCartItems.add(justSavedCartItem);
            }
        }

        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully", overStockCartItems));
    }

    @PatchMapping("/cartItems/{cartItemId}/status")
    public ResponseEntity<ResponseMessage> updateStatusCartItem(@PathVariable Long cartItemId) {
        Optional<CartItems> cartItem = cartItemService.findById(cartItemId);
        if (!cartItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found cart item with id: " + cartItemId));
        }

        Cart cart = cartItem.get().getCart();
        if (!cartService.isMatchCartWithCurrentUser(cart)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with cart!"));
        }

        cartItem.get().setStatus(!cartItem.get().isStatus());
        CartItems justSavedCartItem = cartItemService.save(cartItem.get());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update cart item successfully!", justSavedCartItem));
    }

    @DeleteMapping("/cartItems/{cartItemId}")
    public ResponseEntity<ResponseMessage> deleteCartItems(@PathVariable Long cartItemId) {
        Optional<CartItems> cartItem = cartItemService.findById(cartItemId);
        if (!cartItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found cart item with id: " + cartItemId));
        }

        Cart cart = cartItem.get().getCart();
        if (!cartService.isMatchCartWithCurrentUser(cart)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with cart!"));
        }

       Set<CartItems> newSetCartItems =  cart.getCartItems();
        newSetCartItems.remove(cartItem.get());
        cart.setCartItems(newSetCartItems);

        cart.setTotal(cart.getTotal() - (cartItem.get().getPrice() * cartItem.get().getQuantity()));
        Cart justSavedCart = cartService.save(cart);
        cartItemService.deleteById(cartItem.get().getId());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Delete cart item successfully!", justSavedCart));
    }

    @PatchMapping("/cartItems/{cartItemId}")
    public ResponseEntity<ResponseMessage> minusCartItemsQuantity(@PathVariable Long cartItemId) {
        Optional<CartItems> cartItem = cartItemService.findById(cartItemId);
        if (!cartItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found cart item with id: " + cartItemId));
        }

        Cart cart = cartItem.get().getCart();
        if (!cartService.isMatchCartWithCurrentUser(cart)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with cart!"));
        }

        if (cartItem.get().getQuantity() > 1) {
            cartItem.get().setQuantity(cartItem.get().getQuantity() - 1);
            cartItemService.save(cartItem.get());
            cart.setTotal(cart.getTotal() - cartItem.get().getPrice());
        }

        cartService.save(cart);
        Cart justSavedCart = cartService.save(cart);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Update cart item successfully!", justSavedCart));

    }

    @PostMapping("/{cartId}/cartItems")
    public ResponseEntity<ResponseMessage> saveNewCartItem(@PathVariable Long cartId, @Validated @RequestBody CreateCartItemForm createCartItemForm, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        Optional<Cart> cart = cartService.findById(cartId);
        if (!cart.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found cart at id: " + cartId));
        }

        if (!cartService.isMatchCartWithCurrentUser(cart.get())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with cart!"));
        }

        Optional<ProductOptions> productOptions = productOptionsService.findById(createCartItemForm.getProductOptionId());
        if (!productOptions.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found product option at id: " + createCartItemForm.getProductOptionId()));
        }

        if (productOptions.get().getStock() < createCartItemForm.getQuantity()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not enough products in stock"));
        }

        CartItems cartItemInCart = cartService.findByCartItemInCart(cart.get(), createCartItemForm.getProductOptionId());
        if (cartItemInCart != null) {
            cartItemInCart.setQuantity(cartItemInCart.getQuantity() + createCartItemForm.getQuantity());
            cartItemService.save(cartItemInCart);
        } else {
            Set<CartItems> newSetCartItems = cart.get().getCartItems();
            cartItemInCart = CartItems.builder()
                    .productOptions(productOptions.get())
                    .price(productOptions.get().getPrice())
                    .quantity(createCartItemForm.getQuantity())
                    .cart(cart.get())
                    .build();
            CartItems jusSavedCartItem = cartItemService.save(cartItemInCart);
            newSetCartItems.add(jusSavedCartItem);
            cart.get().setCartItems(newSetCartItems);
        }

        cart.get().setTotal(cart.get().getTotal() + (productOptions.get().getPrice() * createCartItemForm.getQuantity()));
        Cart justSavedCart = cartService.save(cart.get());
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Add new cart item successfully!", justSavedCart));
    }

}
