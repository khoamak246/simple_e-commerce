package com.e_commerce.dto.request;

import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatusForm {

    @Size(min = 1, max = 120)
    private String status;

}
