package com.e_commerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewForm {

    @Size(min = 10, max = 255)
    private String content;

    @Min(1)
    private double rated;

    @Size(min = 1)
    private Set<AssetCreateForm> assets;

    @NotNull
    private Long productId;

    @NotNull
    private Long userId;

    @NotNull
    private String optionName;


}
