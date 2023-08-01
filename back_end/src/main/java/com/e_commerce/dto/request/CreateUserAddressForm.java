package com.e_commerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserAddressForm {

    @NotNull
    private Long userId;

    @NotNull
    private Long provinceCityId;

    @NotNull
    private Long districtId;

    @NotNull
    private Long wardId;

    @NotNull
    private String streetDetail;

}
