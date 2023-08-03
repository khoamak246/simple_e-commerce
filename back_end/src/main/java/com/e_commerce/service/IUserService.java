package com.e_commerce.service;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.request.UpdateUserForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.model.User;
import com.e_commerce.service.design.IGenericService;
import org.springframework.validation.BindingResult;

import java.util.Optional;

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
    boolean isUserIdEqualUserPrincipalId(Long userId);
    boolean isMatcherWithCurrentPassword(Long userId, String currentPassword);
    boolean isValidRegisterForm(RegisterForm registerForm, BindingResult result);
    User updateUserFromForm(User user, UpdateUserForm updateUserForm);

}
