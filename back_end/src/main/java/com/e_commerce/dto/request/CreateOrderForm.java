package com.e_commerce.dto.request;

import com.e_commerce.model.District;
import com.e_commerce.model.Ward;
import com.e_commerce.utils.constant.ValidationRegex;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderForm {

    @Pattern(regexp = ValidationRegex.PHONE_NUMBER_REGEX)
    private String phoneNumber;

    @Pattern(regexp = ValidationRegex.FULL_NAME_REGEX)
    private String receiverName;

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

    @Size(min = 1)
    private Set<CreateOrderItemForm> orderItems;

}
