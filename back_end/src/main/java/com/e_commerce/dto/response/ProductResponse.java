package com.e_commerce.dto.response;

import com.e_commerce.model.Product;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private double data;

}
