package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.CreateCartItemForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.repository.ICartRepository;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.ICartItemService;
import com.e_commerce.service.ICartService;
import com.e_commerce.service.IProductOptionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CartServiceIMPL implements ICartService {

    private final ICartRepository cartRepository;
    private final ICartItemService cartItemService;
    private final IProductOptionsService productOptionsService;

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Cart findById(Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if (!cart.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found cart at id: " + id);
        }
        return cart.get();
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public boolean isMatchCartWithCurrentUser(Cart cart) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!cart.getUserInfo().getUser().getId().equals(currentUser.getId())) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Not match user with cart!");
        }
        return true;
    }

    @Override
    public CartItems findByCartItemInCart(Cart cart, Long productOptionsId) {
        for (CartItems cartItems : cart.getCartItems()) {
            if (cartItems.getProductOptions().getId().equals(productOptionsId)) {
                return cartItems;
            }
        }
        return null;
    }

    @Override
    public Set<CartItems> removeOverStockCartItems(Cart cart) {
        Set<CartItems> cartItems = cart.getCartItems();
        Set<CartItems> inValidCartItems = new HashSet<>();
        for (CartItems cartItem : cartItems) {
            int stock = cartItem.getProductOptions().getStock();
            boolean onSale = cartItem.getProductOptions().getProduct().getOnSale();
            boolean isBlock = cartItem.getProductOptions().getProduct().isBlock();
            if (stock <= 0 || !onSale || isBlock) {
                cartItems.remove(cartItem);
                inValidCartItems.add(cartItem);
            } else if (cartItem.getQuantity() > stock) {
                cartItem.setQuantity(stock);
                inValidCartItems.add(cartItem);
            }
        }
        save(cart);
        return inValidCartItems;
    }

    @Override
    public Cart updateStatusAllCartItem(Cart cart, boolean status) {
        cart.getCartItems().forEach(cartItems -> cartItems.setStatus(status));
        Set<CartItems> newSetCartItems = new HashSet<>(cart.getCartItems());
        cart.setCartItems(newSetCartItems);
        return cart;
    }

    @Override
    public Cart deleteCartItemsAndUpdateCartTotal(Long cartItemId) {
        CartItems cartItem = cartItemService.findById(cartItemId);

        Cart cart = cartItem.getCart();
        isMatchCartWithCurrentUser(cart);

        Set<CartItems> newSetCartItems = cart.getCartItems();
        newSetCartItems.remove(cartItem);
        cart.setCartItems(newSetCartItems);

        cart.setTotal(cart.getTotal() - (cartItem.getPrice() * cartItem.getQuantity()));
        cartItemService.deleteById(cartItem.getId());
        return save(cart);
    }

    @Override
    public Cart minusQuantityCartItemInCart(Long cartItemId) {
        CartItems cartItem = cartItemService.findById(cartItemId);


        Cart cart = cartItem.getCart();
        isMatchCartWithCurrentUser(cart);

        if (cartItem.getQuantity() > 1) {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            cartItemService.save(cartItem);
            cart.setTotal(cart.getTotal() - cartItem.getPrice());
        }

        return save(cart);
    }

    @Override
    public Cart saveNewCartItemToCartFromForm(Long cartId, CreateCartItemForm createCartItemForm) {
        Cart cart = findById(cartId);
        isMatchCartWithCurrentUser(cart);

        ProductOptions productOptions = productOptionsService.findById(createCartItemForm.getProductOptionId());
        if (productOptions.getStock() < createCartItemForm.getQuantity()) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Not enough products in stock");
        }

        CartItems cartItemInCart = findByCartItemInCart(cart, createCartItemForm.getProductOptionId());
        if (cartItemInCart != null) {
            int newCartItemQuantity = cartItemInCart.getQuantity() + createCartItemForm.getQuantity();
            if (newCartItemQuantity > productOptions.getStock()) {
                newCartItemQuantity = productOptions.getStock();
            }
            cartItemInCart.setQuantity(newCartItemQuantity);
            cartItemService.save(cartItemInCart);
        } else {
            Set<CartItems> newSetCartItems = cart.getCartItems();
            cartItemInCart = CartItems.builder()
                    .productOptions(productOptions)
                    .price(productOptions.getPrice())
                    .quantity(createCartItemForm.getQuantity())
                    .cart(cart)
                    .build();
            CartItems jusSavedCartItem = cartItemService.save(cartItemInCart);
            newSetCartItems.add(jusSavedCartItem);
            cart.setCartItems(newSetCartItems);
        }

        cart.setTotal(cart.getTotal() + (productOptions.getPrice() * createCartItemForm.getQuantity()));
        return save(cart);
    }


}
