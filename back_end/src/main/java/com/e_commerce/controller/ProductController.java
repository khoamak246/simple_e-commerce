package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateProductForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.security.userPrincipal.UserPrincipal;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final IShopService shopService;
    private final IBusinessService businessService;
    private final IProductService productService;
    private final IProductOptionsService productOptionsService;
    private final IAssetService assetService;

    @GetMapping("/search/{searchValue}")
    public ResponseEntity<ResponseMessage> getProductByName(@PathVariable("searchValue") String searchValue){
        Set<Product> products = productService.findByNameContainingIgnoreCase(searchValue);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Utils.buildSuccessMessage("Query successfully!", products));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Query successfully!", products));
        }
    }


    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveNewProduct(@Validated @RequestBody CreateProductForm createProductForm,
                                                          BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Not match create product form!"));
        }

        Optional<Shop> shop  = shopService.findById(createProductForm.getShopId());
        if (!shop.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found shop at id: " + createProductForm.getShopId()));
        }

        UserPrincipal userPrincipal  = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isShopOfUser = shop.get().getUser().getId().equals(userPrincipal.getId());
        if (!isShopOfUser){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("User id of shop not match with user principal"));
        }

        boolean isValidProductOptionsForm = productOptionsService.isValidProductOptionsForm(createProductForm.getProductOptions());
        if (!isValidProductOptionsForm) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Utils.buildFailMessage("Not match product option form!"));
        }

        Set<ProductOptions> productOptions = productOptionsService.createByProductOptionsForm(createProductForm.getProductOptions());

        Optional<Business> business = businessService.findById(createProductForm.getBusinessId());
        if (!business.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found business at id: " + createProductForm.getBusinessId()));
        }

        Set<Assets> assets = assetService.createListAssetsByForm(createProductForm.getAssetList());

        Product newProduct = Product.builder()
                .name(createProductForm.getName())
                .createdDate(LocalDate.now().toString())
                .description(createProductForm.getDescription())
                .onSale(true) // TODO : Chinh sua khi them admin
                .shop(shop.get())
                .productOptions(productOptions)
                .business(business.get())
                .assets(assets)
                .build();


        Product justSavedProduct = productService.save(newProduct);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new product successfully!", justSavedProduct));

    }


}
