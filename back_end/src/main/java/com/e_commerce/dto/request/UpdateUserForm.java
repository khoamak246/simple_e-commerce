package com.e_commerce.dto.request;

import com.e_commerce.model.UserAddress;
import com.e_commerce.utils.constant.ValidationRegex;
import lombok.*;

import javax.persistence.Lob;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserForm {

    @Pattern(regexp = ValidationRegex.FULL_NAME_REGEX)
    private String fullName;

    @Pattern(regexp = ValidationRegex.PASSWORD_REGEX)
    private String currentPassword;

    @Pattern(regexp = ValidationRegex.PASSWORD_REGEX)
    private String newPassword;

    @Pattern(regexp = ValidationRegex.EMAIL_REGEX)
    private String email;

    @Pattern(regexp = ValidationRegex.PHONE_NUMBER_REGEX)
    private String phoneNumber;

    private Boolean gender;

    @Pattern(regexp = ValidationRegex.DATE_YEAR_REGEX)
    private String dateOfBirth;

    @Lob
    private String avatar;

    private Set<UserAddress> userAddresses;



}
