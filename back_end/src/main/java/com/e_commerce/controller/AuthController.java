package com.e_commerce.controller;

import com.e_commerce.dto.request.LoginForm;
import com.e_commerce.dto.request.RegisterForm;
import com.e_commerce.dto.response.JwtResponse;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.service.IUserService;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final IValidateService validateRegex;


    @PostMapping("/register")
    public ResponseEntity<ResponseMessage> doRegister(
            @Validated @RequestBody RegisterForm registerForm,
            BindingResult result){

        userService.isValidRegisterForm(registerForm, result);
        userService.registerNewUser(registerForm);

        return ResponseEntity.ok().body(Utils.buildSuccessMessage("New account had been created!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> doLogin(@Validated @RequestBody LoginForm loginForm, BindingResult result){
        validateRegex.isValidForm(result);
        JwtResponse jwtResponse = userService.loginUser(loginForm);
        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }
}
