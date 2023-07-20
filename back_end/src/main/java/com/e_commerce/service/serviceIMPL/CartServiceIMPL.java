package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Cart;
import com.e_commerce.model.CartItems;
import com.e_commerce.repository.ICartRepository;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.ICartService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceIMPL implements ICartService {

    private final ICartRepository cartRepository;

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
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
        return cart.getUserInfo().getUser().getId().equals(currentUser.getId());
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


}
