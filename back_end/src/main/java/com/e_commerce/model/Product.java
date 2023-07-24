package com.e_commerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private int rate;
    private int returnRefundNumber;
    private int cancelNumber;
    private int likeNumber;
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
}
