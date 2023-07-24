package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.User;
import com.e_commerce.model.UserAddress;
import com.e_commerce.repository.IUserAddressRepository;
import com.e_commerce.repository.IUserRepository;
import com.e_commerce.service.IUserAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserAddressServiceIMPL implements IUserAddressService {

    private final IUserAddressRepository userAddressRepository;
    private final IUserRepository userRepository;

    @Override
    public List<UserAddress> findAll() {
        return userAddressRepository.findAll();
    }

    @Override
    public Optional<UserAddress> findById(Long id) {
        return userAddressRepository.findById(id);
    }

    @Override
    public UserAddress save(UserAddress userAddress) {
        return userAddressRepository.save(userAddress);
    }

    @Override
    public void deleteById(Long id) {
    userAddressRepository.deleteById(id);
    }

    @Override
    public Set<UserAddress> findByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(value -> userAddressRepository.findByUserInfoId(value.getUserInfo().getId()))
                .orElse(null);
    }
}
