package com.e_commerce.dto.request;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateBusinessForm {

    private String name;
    private Set<String> subBusiness;

}
