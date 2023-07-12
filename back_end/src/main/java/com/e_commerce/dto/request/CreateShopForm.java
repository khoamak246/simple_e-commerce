package com.e_commerce.dto.request;


import com.e_commerce.utils.constant.ValidationRegex;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateShopForm {
    @Pattern(regexp = ValidationRegex.SHOP_NAME_REGEX)
    private String name;
    private String streetDetail;

    @NotNull
    private Long provinceCityId;

    @NotNull
    private Long districtId;

    @NotNull
    private Long wardId;

    @NotNull
    private Long userId;

}
