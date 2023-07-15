package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.model.Role;
import com.e_commerce.model.User;
import com.e_commerce.model.UserInfo;
import com.e_commerce.repository.IUserRepository;
import com.e_commerce.security.jwt.JwtProvider;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.IRoleService;
import com.e_commerce.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceIMPL implements IUserService {

    private final IUserRepository userRepository;
    private final IRoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public Optional<User> findByUsernameOrEmailOrPhoneNumber(String findingUserData) {
        Optional<User> user = findByUsername(findingUserData);
        if (!user.isPresent()) {
            user = findByEmail(findingUserData);
            if (!user.isPresent()) {
                user = findByPhoneNumber(findingUserData);
            }
        }
        return user;
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhoneNumber(String email) {
        return userRepository.existsByPhoneNumber(email);
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void registerNewUser(RegisterForm registerForm) {
        Set<Role> roles = roleService.createUserRegisterRole(registerForm.getRoles());
        UserInfo userInfo = UserInfo.builder()
                .createdDate(LocalDate.now().toString())
                .avatar("https://firebasestorage.googleapis.com/v0/b/insta-fullstack.appspot.com/o/defaultAvatar.jpg?alt=media&token=156e7504-89ab-41e0-b185-864196000f98&_gl=1*1d2dync*_ga*OTg5NTExNTUxLjE2ODYzMjQzMDE.*_ga_CW55HF8NVT*MTY4NjM3MjI1NC4zLjEuMTY4NjM3MjMyNi4wLjAuMA..")
                .build();

        User user = User.builder()
                .fullName(registerForm.getFullName())
                .username(registerForm.getUsername())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .email(registerForm.getEmail())
                .phoneNumber(registerForm.getPhoneNumber())
                .userInfo(userInfo)
                .roles(roles)
                .build();

        save(user);
    }

    @Override
    public JwtResponse loginUser(LoginForm loginForm) {
        Optional<User> user = findByUsernameOrEmailOrPhoneNumber(loginForm.getUsername());

        if (!user.isPresent()) {
            return null;
        } else {
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.get().getUsername(),
                                loginForm.getPassword()
                        ));
                user.get().getUserInfo().setLastLogin(LocalDate.now().toString());
                User justSavedUser = save(user.get());
                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                String token = jwtProvider.generateToken(authentication);
                return JwtResponse.builder()
                        .expiredTime(jwtProvider.getExpiredTimeFromToken(token))
                        .status("OK")
                        .type("Bearer")
                        .user(justSavedUser)
                        .token(token)
                        .roles(userPrincipal.getRoles())
                        .build();
            } catch (AuthenticationException e) {
                return null;
            }
        }
    }

    @Override
    public boolean isUserIdEqualUserPrincipalId(Long userId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return currentUser.getId().equals(userId);
    }

    @Override
    public boolean isMatcherWithCurrentPassword(Long userId, String currentPassword) {
        User user = findById(userId).orElseThrow(() -> new IllegalArgumentException("Not found user at id: " + userId));
        return passwordEncoder.matches(currentPassword,user.getPassword());
    }
}
