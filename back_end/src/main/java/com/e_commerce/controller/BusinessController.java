package com.e_commerce.controller;

import com.e_commerce.dto.request.CategoriesSearchForm;
import com.e_commerce.dto.request.CreateBusinessForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Business;
import com.e_commerce.model.Product;
import com.e_commerce.service.IBusinessService;
import com.e_commerce.service.IProductService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/business")
@RequiredArgsConstructor
public class BusinessController {

    private final IBusinessService businessService;
    private final IProductService productService;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findByBusinessIsEmpty() {
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", businessService.findByBusinessIsEmpty()));
    }

    @GetMapping("/product/{businessId}")
    public ResponseEntity<ResponseMessage> findProductByBusinessId(@PathVariable Long businessId) {
        Optional<Business> businesses = businessService.findById(businessId);
        if (!businesses.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + businessId));
        }

        Set<Business> allRelativeBusiness = new HashSet<>();
        allRelativeBusiness.add(businesses.get());
        businesses.get().getSubBusiness().forEach(subBusiness -> {
            allRelativeBusiness.add(subBusiness);
            if (subBusiness.getSubBusiness().size() != 0) {
                allRelativeBusiness.addAll(subBusiness.getSubBusiness());
            }
        });

        Set<Product> products = new HashSet<>();
        allRelativeBusiness.forEach(business -> {
            products.addAll(business.getProduct());
        });

        List<Product> productList = new ArrayList<>(products);
        Collections.shuffle(productList);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", productList));
    }

    @PostMapping("/search-product-business")
    public ResponseEntity<ResponseMessage> searchValueByBusiness(@RequestBody CategoriesSearchForm categoriesSearchForm) {
        Optional<Business> business = businessService.findById(categoriesSearchForm.getBusinessId());
        if (!business.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + categoriesSearchForm.getBusinessId()));
        }


        Set<Product> products = new HashSet<>(business.get().getProduct());

        if (categoriesSearchForm.getSubBusinessId() != null) {
            Optional<Business> subBusiness = businessService.findById(categoriesSearchForm.getSubBusinessId());
            if (!subBusiness.isPresent()) {
                return ResponseEntity.badRequest().body(Utils.buildFailMessage("Not found sub business at id: " + categoriesSearchForm.getSubBusinessId()));
            }
            if (!business.get().getSubBusiness().contains(subBusiness.get())) {
                return ResponseEntity.badRequest().body(Utils.buildFailMessage("Business not contain sub business id: " + categoriesSearchForm.getSubBusinessId()));
            }
            products.addAll(subBusiness.get().getProduct());
            if (subBusiness.get().getSubBusiness().size() != 0) {
                subBusiness.get().getSubBusiness().forEach(bus -> {
                    products.addAll(bus.getProduct());
                });
            }

        }

        products.removeIf(p -> !p.getOnSale());
        products.removeIf(Product::isBlock);

        if (categoriesSearchForm.getSearchName() != null)
            products.removeIf(p -> !p.getName().toLowerCase().contains(categoriesSearchForm.getSearchName().toLowerCase()));

        if (categoriesSearchForm.getRate() != null)
            products.removeIf(p -> p.getRate() < categoriesSearchForm.getRate());

        if (categoriesSearchForm.getProvinceCityId() != null)
            products.removeIf(p -> !p.getShop().getProvinceCity().getId().equals(categoriesSearchForm.getProvinceCityId()));

        if (categoriesSearchForm.getMinPrice() != null)
            products.removeIf(p -> productService.getMinPriceProductOption(p) < categoriesSearchForm.getMinPrice());

        if (categoriesSearchForm.getMaxPrice() != null)
            products.removeIf(p -> productService.getMinPriceProductOption(p) > categoriesSearchForm.getMaxPrice());

        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", products));

    }


    @GetMapping("/{businessId}")
    public ResponseEntity<ResponseMessage> findBusinessById(@PathVariable Long businessId) {
        Optional<Business> business = businessService.findById(businessId);
        return business.map(value -> ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", value)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + businessId)));

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
        Optional<Business> business = businessService.findById(businessId);
        if (!business.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + businessId));
        }

        Set<Business> subBusiness = new HashSet<>();
        for (String businessName : createBusinessForm.getSubBusiness()) {
            Business subBusinessItem = Business.builder()
                    .name(businessName)
                    .build();

            subBusiness.add(subBusinessItem);
        }
        business.get().setSubBusiness(subBusiness);
        Business justSavedBusiness = businessService.save(business.get());
        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new sub business successfully!", justSavedBusiness));
    }

}
