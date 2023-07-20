package com.e_commerce.dto.request;

import com.e_commerce.model.Cart;
import com.e_commerce.model.ProductOptions;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCartItemForm {
    @NotNull
    private Long productOptionId;
    @Min(1)
    private int quantity;
}
