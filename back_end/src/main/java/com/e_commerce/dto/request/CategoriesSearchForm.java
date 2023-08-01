package com.e_commerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoriesSearchForm {

    private String searchName;
    private Long businessId;
    private Long subBusinessId;
    private Double minPrice;
    private Double maxPrice;
    private Integer rate;
    private Long provinceCityId;

}
