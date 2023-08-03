package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateProductForm;
import com.e_commerce.dto.request.UpdateProductForm;
import com.e_commerce.dto.response.ProductResponse;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.*;
import com.e_commerce.service.*;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final IShopService shopService;
    private final IBusinessService businessService;
    private final IProductService productService;
    private final IProductOptionsService productOptionsService;
    private final IAssetService assetService;
    private final IUserService userService;
    private final IValidateService validateRegex;

    @GetMapping("/search/{searchValue}")
    public ResponseEntity<ResponseMessage> getProductByName(@PathVariable("searchValue") String searchValue){
        Set<Product> products = productService.findByNameContainingIgnoreCase(searchValue);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Utils.buildSuccessMessage("Query successfully!", products));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Query successfully!", products));
        }
    }

    @GetMapping("/top-payment")
    @Transactional
    public ResponseEntity<ResponseMessage> getTopPaymentProduct(@RequestParam int offsetNumber, @RequestParam int limitNumber) {
        Set<ProductResponse> productResponses = productService.findTopPaymentProduct(offsetNumber, limitNumber);
        Set<Product> products = productResponses.stream().map(res -> productService.findById(res.getId())).collect(Collectors.toSet());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Query successfully!", products));
    }



    @GetMapping("/{productId}")
    public ResponseEntity<ResponseMessage> getProductById(@PathVariable Long productId) {
        Product product = productService.findById(productId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Query successfully!", product));
    }


    @PostMapping("")
    @Transactional
    public ResponseEntity<ResponseMessage> saveNewProduct(@Validated @RequestBody CreateProductForm createProductForm,
                                                          BindingResult result){
        validateRegex.isValidForm(result);
        Shop shop  = shopService.findById(createProductForm.getShopId());
        shopService.isCurrentUserMatchShopUserid(shop.getId());
        productOptionsService.isValidProductOptionsForm(createProductForm.getProductOptions());
        Business business = businessService.findById(createProductForm.getBusinessId());
        Set<Assets> assets = assetService.createListAssetsByForm(createProductForm.getAssetList());

        Product newProduct = Product.builder()
                .name(createProductForm.getName())
                .createdDate(LocalDate.now().toString())
                .description(createProductForm.getDescription())
                .onSale(false)
                .shop(shop)
                .business(business)
                .assets(assets)
                .build();


        Product justSavedProduct = productService.save(newProduct);
        productOptionsService.createByProductOptionsForm(createProductForm.getProductOptions(), justSavedProduct);
        Shop newShop = justSavedProduct.getShop();
        newShop.setProductNumber(newShop.getProductNumber() + 1);
        shopService.save(newShop);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Create new product successfully!", justSavedProduct));

    }

    @PatchMapping("/{productId}")
    public ResponseEntity<ResponseMessage> updateProduct(@PathVariable Long productId, @RequestBody UpdateProductForm updateProductForm) {
        Product product = productService.findById(productId);

        Shop shop = product.getShop();
        shopService.isCurrentUserMatchShopUserid(shop.getId());
        Product afterUpdateProduct = productService.updateProductByFrom(product, updateProductForm);
        productService.save(afterUpdateProduct);
        Set<Product> newSetProduct = productService.findByShopId(shop.getId());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update product successfully!", newSetProduct));
    }


    @PostMapping("/{productId}/favorites/{userId}")
    public ResponseEntity<ResponseMessage> saveFavorites(@PathVariable Long productId, @PathVariable Long userId) {
        userService.isUserIdEqualUserPrincipalId(userId);
        Product product = productService.findById(productId);
        User user = userService.findById(userId);

        Set<UserInfo> favorites = productService.addProductFavorites(user, product);
        product.setFavorites(favorites);
        Product justSavedProduct = productService.save(product);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Save favorites successfully!", justSavedProduct));
    }
}
