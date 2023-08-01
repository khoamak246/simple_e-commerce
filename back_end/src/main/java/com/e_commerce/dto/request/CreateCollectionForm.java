package com.e_commerce.dto.request;

import com.e_commerce.model.Product;
import com.e_commerce.model.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCollectionForm {
    @Size(min = 1, max = 120)
    private String name;

    @NotNull
    private Long shopId;
}
