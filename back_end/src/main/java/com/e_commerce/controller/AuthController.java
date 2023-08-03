package com.e_commerce.controller;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.User;
import com.e_commerce.service.IRoleService;
import com.e_commerce.service.IUserService;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IUserService userService;


    @PostMapping("/register")
    public ResponseEntity<ResponseMessage> doRegister(
            @Validated @RequestBody RegisterForm registerForm,
            BindingResult result){
        if (result.hasErrors()) {
            throw new ApiRequestException(HttpStatus.BAD_REQUEST, ValidationRegex.INVALID_MESSAGE);
        }

        boolean isExistUserName = userService.existsByUsername(registerForm.getUsername());
        if (isExistUserName) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Username are already exist!");
        }


        boolean isExistEmail = userService.existsByEmail(registerForm.getEmail());
        if (isExistEmail) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Email are already exist!");
        }

        boolean isExistPhoneNumber = userService.existsByPhoneNumber(registerForm.getPhoneNumber());
        if (isExistPhoneNumber) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Phone Number are already exist!");
        }

        userService.registerNewUser(registerForm);

        return ResponseEntity.ok().body(Utils.buildSuccessMessage("New account had been created!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> doLogin(@Validated @RequestBody LoginForm loginForm, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE)
            );
        }

        JwtResponse jwtResponse = userService.loginUser(loginForm);
        if (jwtResponse != null){
            return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
        } else {
            throw new ApiRequestException(HttpStatus.UNAUTHORIZED, "Wrong username or password!");
        }
    }
}
