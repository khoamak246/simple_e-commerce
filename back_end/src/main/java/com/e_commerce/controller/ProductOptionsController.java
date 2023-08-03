package com.e_commerce.controller;

import com.e_commerce.dto.request.UpdateProductOptionForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Product;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.model.Shop;
import com.e_commerce.service.IProductOptionsService;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IShopService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/productOptions")
@RequiredArgsConstructor
public class ProductOptionsController {

    private final IProductOptionsService productOptionsService;
    private final IShopService shopService;
    private final IProductService productService;

    @PatchMapping("/{productOptionId}")
    public ResponseEntity<ResponseMessage> patchUpdateProductOption(@PathVariable Long productOptionId, @RequestBody UpdateProductOptionForm updateProductOptionForm) {

        ProductOptions productOption = productOptionsService.findById(productOptionId);
        Shop shop = productOption.getProduct().getShop();
        shopService.isCurrentUserMatchShopUserid(shop.getId());
        ProductOptions afterUpdateProductOption = productOptionsService.updateProductOptionsByForm(productOption, updateProductOptionForm);
        productOptionsService.save(afterUpdateProductOption);
        Set<Product> newProductSet = productService.findByShopId(shop.getId());
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update product option successfully!", newProductSet));

    }

}
