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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
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

        Optional<ProductOptions> productOption = productOptionsService.findById(productOptionId);
        if (!productOption.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found product option at id: " + productOptionId));
        }

        Shop shop = productOption.get().getProduct().getShop();
        if (!shopService.isCurrentUserMatchShopUserid(shop.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with shop"));
        }

        if (updateProductOptionForm.getName() != null) {
            productOption.get().setName(updateProductOptionForm.getName());
        }


         if (updateProductOptionForm.getPrice() != null) {
            productOption.get().setPrice(updateProductOptionForm.getPrice());
        }

         if (updateProductOptionForm.getStock() != null) {
            productOption.get().setStock(updateProductOptionForm.getStock());
        }

        productOptionsService.save(productOption.get());
        Set<Product> newProductSet = productService.findByShopId(shop.getId());
        return ResponseEntity.ok(Utils.buildSuccessMessage("Update product option successfully!", newProductSet));

    }

}
