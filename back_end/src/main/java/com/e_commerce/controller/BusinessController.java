package com.e_commerce.controller;

import com.e_commerce.dto.request.CategoriesSearchForm;
import com.e_commerce.dto.request.CreateBusinessForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.dto.response.SearchBusinessResponse;
import com.e_commerce.model.Business;
import com.e_commerce.model.Product;
import com.e_commerce.service.IBusinessService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/business")
@RequiredArgsConstructor
public class BusinessController {

    private final IBusinessService businessService;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findByBusinessIsEmpty() {
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", businessService.findByBusinessIsEmpty()));
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseMessage> findBusinessByName(@RequestParam String keyword) {
        Set<Business> result = businessService.findByNameContainingIgnoreCase(keyword);
        Set<SearchBusinessResponse> binding = result.stream().map(bus -> SearchBusinessResponse.builder().id(bus.getId()).name(bus.getName()).build()).collect(Collectors.toSet());
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", binding));
    }

    @GetMapping("/product/{businessId}")
    public ResponseEntity<ResponseMessage> findProductByBusinessId(@PathVariable Long businessId) {
        List<Product> productList = businessService.findProductByBusinessId(businessId);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", productList));
    }

    @PostMapping("/search-product-business")
    public ResponseEntity<ResponseMessage> searchValueByBusiness(@RequestBody CategoriesSearchForm categoriesSearchForm) {

        Set<Product> products = businessService.searchValueByCategoriesSearchForm(categoriesSearchForm);

        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", products));

    }


    @GetMapping("/{businessId}")
    public ResponseEntity<ResponseMessage> findBusinessById(@PathVariable Long businessId) {
        Business business = businessService.findById(businessId);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", business));
    }


    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage> saveBusiness(@RequestBody CreateBusinessForm createBusinessForm) {
        Business business = Business.builder()
                .name(createBusinessForm.getName())
                .build();

        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new business successfully!", businessService.save(business)));
    }

    @PostMapping("/subBusiness/{businessId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage> saveSubBusiness(@PathVariable Long businessId,
                                                           @RequestBody CreateBusinessForm createBusinessForm) {
        Business business = businessService.createSubBusinessFromFormAndBusinessId(businessId, createBusinessForm);
        Business justSavedBusiness = businessService.save(business);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new sub business successfully!", justSavedBusiness));
    }

}
