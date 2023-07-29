package com.e_commerce.model;

import com.e_commerce.dto.response.ProductResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@NamedStoredProcedureQuery(name = "find_top_ten_product_have_max_number_order",
        procedureName = "find_top_ten_product_have_max_number_order", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)},
        resultSetMappings = "product_response_top_ten_product_have_max_number_order"
)
@SqlResultSetMapping(name = "product_response_top_ten_product_have_max_number_order",
classes = @ConstructorResult(
        targetClass = ProductResponse.class,
        columns = {
                @ColumnResult(name = "id", type = Long.class),
                @ColumnResult(name = "name", type = String.class),
                @ColumnResult(name = "data", type = Double.class)
        }
)
)

@NamedStoredProcedureQuery(name = "find_top_ten_favorites_product",
        procedureName = "find_top_ten_favorites_product", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)},
        resultSetMappings = "product_response_top_ten_favorites_product"
)
@SqlResultSetMapping(name = "product_response_top_ten_favorites_product",
        classes = @ConstructorResult(
                targetClass = ProductResponse.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "data", type = Double.class)
                }
        )
)

@NamedStoredProcedureQuery(name = "find_product_have_max_cancel_order_percent",
        procedureName = "find_product_have_max_cancel_order_percent", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shop_id", type = Long.class)},
        resultSetMappings = "product_product_have_max_cancel_order_percent"
)
@SqlResultSetMapping(name = "product_product_have_max_cancel_order_percent",
        classes = @ConstructorResult(
                targetClass = ProductResponse.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "data", type = Double.class)
                }
        )
)

@NamedStoredProcedureQuery(name = "find_product_have_max_return_order_percent",
        procedureName = "find_product_have_max_return_order_percent", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)},
        resultSetMappings = "product_product_have_max_return_order_percent"
)
@SqlResultSetMapping(name = "product_product_have_max_return_order_percent",
        classes = @ConstructorResult(
                targetClass = ProductResponse.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "data", type = Double.class)
                }
        )
)

@NamedStoredProcedureQuery(name = "find_top_five_product_have_max_revenue",
        procedureName = "find_top_five_product_have_max_revenue", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "shopId", type = Long.class)},
        resultSetMappings = "product_product_top_five_product_have_max_revenue"
)
@SqlResultSetMapping(name = "product_product_top_five_product_have_max_revenue",
        classes = @ConstructorResult(
                targetClass = ProductResponse.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "data", type = Double.class)
                }
        )
)

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(columnDefinition = "date")
    private String createdDate;

    @Lob
    private String description;

    @Column(columnDefinition = "bit")
    private Boolean onSale;
    private boolean block;

    private int visitNumber;
    private int reviewNumber;
    private double rate;
    private int returnRefundNumber;
    private int cancelNumber;
    private int saleNumber;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "shop_id")
    @JsonIgnoreProperties({"products"})
    private Shop shop;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties({"product"})
    private Set<ProductOptions> productOptions;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "business_id")
    @JsonIgnoreProperties({"product"})
    private Business business;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Assets> assets;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties({"product"})
    private Set<Review> reviews;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "favorites",
            joinColumns = {@JoinColumn(name = "product_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_info_id")})
    @JsonIgnoreProperties({"order", "cart", "notifications", "userAddresses", "favoritesProduct"})
    private Set<UserInfo> favorites;
}
