package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.CartItems;
import com.e_commerce.repository.ICartItemsRepository;
import com.e_commerce.service.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemsServiceIMPL implements ICartItemService {

    private final ICartItemsRepository cartItemsRepository;

    @Override
    public List<CartItems> findAll() {
        return cartItemsRepository.findAll();
    }

    @Override
    public CartItems findById(Long id) {
        Optional<CartItems> cartItems = cartItemsRepository.findById(id);
        if (!cartItems.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found cartItems at id: " + id);
        }
        return cartItems.get();
    }

    @Override
    public CartItems save(CartItems cartItems) {
        return cartItemsRepository.save(cartItems);
    }

    @Override
    public void deleteById(Long id) {
        cartItemsRepository.deleteById(id);
    }
}
