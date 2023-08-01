package com.e_commerce.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "sub_business",
            joinColumns = @JoinColumn(name = "business_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_business_id"))
   private Set<Business> subBusiness;

    @ManyToMany(mappedBy = "subBusiness")
    @JsonIgnoreProperties({"subBusiness"})
    private Set<Business> business;

    @OneToMany(mappedBy = "business")
    @JsonIgnoreProperties({"business", "shop"})
    private Set<Product> product;

}
