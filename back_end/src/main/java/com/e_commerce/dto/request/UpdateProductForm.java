package com.e_commerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductForm {
    private String name;
    private String description;
    private Boolean onSale;
    private Boolean block;
    private Integer visitNumber;
    private Long businessId;
}
