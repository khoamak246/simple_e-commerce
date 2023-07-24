package com.e_commerce.dto.response;

import com.e_commerce.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShopResponse {

    private Long id;
    private String name;
    private String createdDate;
    private Boolean status;
    private String avatar;
    private String coverImg;
    private Set<Assets> introduce;
    private String description;
    private String streetDetail;
    private ProvinceCity provinceCity;
    private District district;
    private Ward ward;

    private int visitNumber;
    private int rate;
//    TODO: add comment product
//    private int reviewNumber;
    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> orderItems;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> cancelOrderItems;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> returnOrderItems;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> waitingConfirmations;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> goodsWaitingConfirmations;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> doneProcessingOrderItems;

    @JsonIgnoreProperties({"shop"})
    private Set<OrderItems> deliveryOrderItems;

    private List<User> followers;

    private Set<Product> products;

    private Set<PaymentWay> paymentWays;

    private Set<Collection> collections;

}
