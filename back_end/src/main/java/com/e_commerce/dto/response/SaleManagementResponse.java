package com.e_commerce.dto.response;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleManagementResponse {
    private int productNumber;
    private ProductResponse maxCancelOrderPercentProduct;
    private ProductResponse maxReturnOrderPercentProduct;
    private int FollowerNumber;
    private Set<ProductResponse> top10ProductMaxOrder;
    private Set<ProductResponse> top10ProductMaxFavorites;
    private Set<ProductResponse> top10ProductMaxVisitNumber;
    private Set<ProductResponse> top5ProductMaxRevenue;
    private String type;


}
