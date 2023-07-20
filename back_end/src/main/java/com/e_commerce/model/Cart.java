package com.e_commerce.model;

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
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double total;

    @OneToMany(mappedBy = "cart")
    private Set<CartItems> cartItems;

    @OneToOne(mappedBy = "cart")
    @JsonIgnoreProperties({"cart"})
    private UserInfo userInfo;

}
