package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Shop;
import com.e_commerce.repository.IShopRepository;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.IShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShopServiceIMPL implements IShopService {

    private final IShopRepository shopRepository;

    @Override
    public List<Shop> findAll() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Shop> findById(Long id) {
        return shopRepository.findById(id);
    }

    @Override
    public Shop save(Shop shop) {
        return shopRepository.save(shop);
    }

    @Override
    public void deleteById(Long id) {
        shopRepository.deleteById(id);
    }

    @Override
    public Optional<Shop> findByUserId(Long userId) {
        return shopRepository.findByUserId(userId);
    }

    @Override
    public boolean isCurrentUserMatchShopUserid(Long shopId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Shop> shop = findById(shopId);
        return shop.map(value -> value.getUser().getId().equals(currentUser.getId())).orElse(false);


    }
}
