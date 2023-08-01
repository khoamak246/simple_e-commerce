package com.e_commerce.model;

import com.e_commerce.dto.response.ProductResponse;
import com.e_commerce.dto.response.ShopRevenueResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@NamedStoredProcedureQuery(name = "count_number_follower_shop",
        procedureName = "count_number_follower_shop", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)}
)

@NamedStoredProcedureQuery(name = "find_total_revenue_shop",
        procedureName = "find_total_revenue_shop", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)}
)

@NamedStoredProcedureQuery(name = "find_revenue_each_month",
        procedureName = "find_revenue_each_month", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class),
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "year", type = Integer.class),},
        resultSetMappings = "shop_revenue_each_month"
)
@SqlResultSetMapping(name = "shop_revenue_each_month",
        classes = @ConstructorResult(
                targetClass = ShopRevenueResponse.class,
                columns = {
                        @ColumnResult(name = "month", type = Integer.class),
                        @ColumnResult(name = "revenue", type = Double.class)
                }
        )
)
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(columnDefinition = "date")
    private String createdDate;

    @Column(columnDefinition = "bit")
    private Boolean status;

    @Lob
    private String avatar;

    @Lob
    private String coverImg;

    @NotBlank
    private String description;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Assets> introduce;

    private int productNumber;

    private String streetDetail;

    @OneToMany(mappedBy = "shop")
    @JsonIgnore
    private Set<OrderItems> orderItems;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "provinceCity_id")
    private ProvinceCity provinceCity;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "district_id")
    private District district;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "ward_id")
    private Ward ward;

    private int visitNumber;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("userInfo")
    private Set<User> followers;

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties({"shop"})
    private Set<Product> products;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "shop_payment",
            joinColumns = {@JoinColumn(name = "shop_id")},
            inverseJoinColumns = {@JoinColumn(name = "payment_id")})
    private Set<PaymentWay> paymentWays;

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties({"shop"})
    private Set<Collection> collections;


}
