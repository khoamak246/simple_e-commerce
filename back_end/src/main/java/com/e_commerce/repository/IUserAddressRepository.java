package com.e_commerce.repository;

import com.e_commerce.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IUserAddressRepository extends JpaRepository<UserAddress, Long> {
    Set<UserAddress> findByUserInfoId(Long UserInfoId);
}
