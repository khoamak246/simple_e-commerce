package com.e_commerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductForm {

    @Size(min = 10)
    @Size(max = 120)
    private String name;

    @Size(min = 10)
    @Size(max = 3000)
    private String description;

    @NotNull
    private Long shopId;

    @Size(min = 1)
    private Set<ProductOptionDTO> productOptions;

    @NotNull
    private Long businessId;

    @Size(min = 1)
    private List<AssetCreateForm> assetList;


}
