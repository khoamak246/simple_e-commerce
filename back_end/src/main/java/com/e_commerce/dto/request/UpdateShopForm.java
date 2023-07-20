package com.e_commerce.dto.request;

import com.e_commerce.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateShopForm {


    private String name;

    private Boolean status;

    private String avatar;

    private String description;

    private String streetDetail;

    private Long provinceCityId;

    private Long districtId;

    private Long wardId;

    private Set<Long> paymentWays;

}
