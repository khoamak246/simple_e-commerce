package com.e_commerce.dto.response;

import com.e_commerce.model.OrderItems;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RevenueManagementResponse {

    private double totalRevenue;
    private Set<OrderItems> top10Revenue;
    private Set<ShopRevenueResponse> sumRevenueEachMonthShop;
    private String type;
}
