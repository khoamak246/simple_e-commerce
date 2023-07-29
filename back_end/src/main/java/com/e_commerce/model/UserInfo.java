package com.e_commerce.model;

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
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "userInfo")
    @JsonIgnoreProperties({"userInfo"})
    private User user;

    @Column(columnDefinition = "bit")
    private Boolean gender;

    @Column(columnDefinition = "date")
    private String dateOfBirth;

    @Column(columnDefinition = "date")
    private String createdDate;

    @Lob
    private String avatar;

    @Column(columnDefinition = "date")
    private String lastLogin;

    @OneToMany(mappedBy = "userInfo")
    @JsonIgnoreProperties({"userInfo"})
    private Set<UserAddress> userAddresses;

    @OneToMany(mappedBy = "userInfo")
    private Set<Notifications> notifications;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    @JsonIgnoreProperties({"userInfo"})
    private Cart cart;

    @OneToMany(mappedBy = "userInfo")
    @JsonIgnoreProperties({"userInfo"})
    private Set<Order> order;

    @ManyToMany(mappedBy = "favorites")
    @JsonIgnoreProperties({"favorites", "shop", "business", "reviews"})
    private Set<Product> favoritesProduct;


}
