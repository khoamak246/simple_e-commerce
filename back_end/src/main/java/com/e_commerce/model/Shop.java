package com.e_commerce.model;

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
    private List<User> followers;

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties({"shop"})
    private Set<Product> products;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<PaymentWay> paymentWays;

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties({"shop"})
    private Set<Collection> collections;


}
