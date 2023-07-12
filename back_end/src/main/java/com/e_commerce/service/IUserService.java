package com.e_commerce.service;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.model.Role;
import com.e_commerce.model.User;
import com.e_commerce.service.design.IGenericService;

import java.util.Optional;
import java.util.Set;

public interface IUserService extends IGenericService<User> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByUsernameOrEmailOrPhoneNumber(String findingUserData);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String email);
    void registerNewUser(RegisterForm registerForm);
    JwtResponse loginUser(LoginForm loginForm);

}
