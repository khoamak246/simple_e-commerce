package com.e_commerce.dto.request;

import com.e_commerce.utils.constant.ValidationRegex;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginForm {

    @Pattern(regexp = ValidationRegex.LOGIN_USERNAME_REGEX)
    private String username;

    @Pattern(regexp = ValidationRegex.PASSWORD_REGEX)
    private String password;
}
