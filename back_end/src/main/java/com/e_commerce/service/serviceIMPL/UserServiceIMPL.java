package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.request.UpdateUserForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Cart;
import com.e_commerce.model.Role;
import com.e_commerce.model.User;
import com.e_commerce.model.UserInfo;
import com.e_commerce.repository.IUserRepository;
import com.e_commerce.security.jwt.JwtProvider;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.IRoleService;
import com.e_commerce.service.IUserService;
import com.e_commerce.service.IValidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

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
    private final IValidateService validateRegex;

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
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found user at id: " + id);
        }
        return user.get();
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
                .cart(Cart.builder().build())
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
            throw new ApiRequestException(HttpStatus.UNAUTHORIZED, "Wrong username or password!");
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
                throw new ApiRequestException(HttpStatus.UNAUTHORIZED, "Wrong username or password!");
            }
        }
    }

    @Override
    public boolean isUserIdEqualUserPrincipalId(Long userId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!currentUser.getId().equals(userId)) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Not match user request!");
        }
        return true;
    }

    @Override
    public boolean isMatcherWithCurrentPassword(Long userId, String currentPassword) {
        User user = findById(userId);
        return passwordEncoder.matches(currentPassword,user.getPassword());
    }

    @Override
    public boolean isValidRegisterForm(RegisterForm registerForm, BindingResult result) {
        validateRegex.isValidForm(result);

        boolean isExistUserName = existsByUsername(registerForm.getUsername());
        if (isExistUserName) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Username are already exist!");
        }


        boolean isExistEmail = existsByEmail(registerForm.getEmail());
        if (isExistEmail) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Email are already exist!");
        }

        boolean isExistPhoneNumber = existsByPhoneNumber(registerForm.getPhoneNumber());
        if (isExistPhoneNumber) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Phone Number are already exist!");
        }
        return true;
    }

    @Override
    public User updateUserFromForm(User user, UpdateUserForm updateUserForm) {


        if (updateUserForm.getFullName() != null){
            user.setFullName(updateUserForm.getFullName());
        }

        if (updateUserForm.getCurrentPassword() != null
                && updateUserForm.getNewPassword() != null
                && isMatcherWithCurrentPassword(user.getId(), updateUserForm.getCurrentPassword())){
            user.setPassword(passwordEncoder.encode(updateUserForm.getNewPassword()));
        }

        if (updateUserForm.getEmail() != null) {
            user.setEmail(updateUserForm.getEmail());
        }

        if (updateUserForm.getPhoneNumber() != null) {
            user.setPhoneNumber(updateUserForm.getPhoneNumber());
        }

        user.getUserInfo().setGender(updateUserForm.getGender());

        if (updateUserForm.getDateOfBirth() != null){
            user.getUserInfo().setDateOfBirth(updateUserForm.getDateOfBirth());
        }

        if (updateUserForm.getAvatar() != null){
            user.getUserInfo().setAvatar(updateUserForm.getAvatar());
        }

        if (updateUserForm.getUserAddresses() != null){
            user.getUserInfo().setUserAddresses(updateUserForm.getUserAddresses());
        }

        return user;
    }

}
