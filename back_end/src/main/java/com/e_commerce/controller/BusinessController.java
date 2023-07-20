package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateBusinessForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Business;
import com.e_commerce.service.IBusinessService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/business")
@RequiredArgsConstructor
public class BusinessController {

    private final IBusinessService businessService;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findByBusinessIsEmpty(){
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", businessService.findByBusinessIsEmpty()));
    }


    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage> saveBusiness(@RequestBody CreateBusinessForm createBusinessForm){
        Business business = Business.builder()
                .name(createBusinessForm.getName())
                .build();

        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new business successfully!", businessService.save(business)));
    }

    @PostMapping("/subBusiness/{businessId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage> saveSubBusiness(@PathVariable Long businessId,
                                                           @RequestBody CreateBusinessForm createBusinessForm){
        Optional<Business> business = businessService.findById(businessId);
        if (!business.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + businessId));
        }

        Set<Business> subBusiness = new HashSet<>();
       for(String businessName : createBusinessForm.getSubBusiness()){
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
