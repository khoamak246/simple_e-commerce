package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateCollectionForm;
import com.e_commerce.dto.request.UpdateCollectionForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Collection;
import com.e_commerce.model.Product;
import com.e_commerce.model.Shop;
import com.e_commerce.service.ICollectionService;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IShopService;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/collection")
@RequiredArgsConstructor
public class CollectionController {
    private final IShopService shopService;
    private final IProductService productService;
    private final ICollectionService collectionService;

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<ResponseMessage> deleteCollectionById(@PathVariable Long collectionId){
        Optional<Collection> collection = collectionService.findById(collectionId);
        if (!collection.isPresent()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage("Not found collection at id: " + collectionId));
        }

        Long shopId = collection.get().getShop().getId();
        if (!shopService.isCurrentUserMatchShopUserid(shopId)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with shop id: " + shopId));
        }

        collection.get().setProducts(new HashSet<>());
        Collection justSavedCollection = collectionService.save(collection.get());
        collectionService.deleteById(justSavedCollection.getId());
        Set<Collection> shopCollection = collectionService.findByShopId(shopId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Delete collection successfully!", shopCollection));
    }

    @PatchMapping("/{collectionId}")
    public ResponseEntity<ResponseMessage> patchUpdateCollection(@PathVariable Long collectionId, @RequestBody UpdateCollectionForm updateCollectionForm){

        Optional<Collection> collection = collectionService.findById(collectionId);
        if (!collection.isPresent()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage("Not found collection at id: " + collectionId));
        }

        Long shopId = collection.get().getShop().getId();
        if (!shopService.isCurrentUserMatchShopUserid(shopId)){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user with shop id: " + shopId));
        }

        String name = updateCollectionForm.getName();
        if (name != null){
            if (name.length() > 120) {
                return ResponseEntity.badRequest().body(Utils.buildFailMessage("Name size can not over 120 letter!"));
            }
            collection.get().setName(name);
        }

        if (updateCollectionForm.getProducts() != null) {
            Set<Product> products = productService.createSetProductFromDtoForm(updateCollectionForm.getProducts());
            if (products == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Have not existing product!"));
            }

            collection.get().setProducts(products);
        }

        collectionService.save(collection.get());
        Set<Collection> shopCollection = collectionService.findByShopId(shopId);
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update collection successfully!", shopCollection));
    }

    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveNewCollection(@Validated @RequestBody CreateCollectionForm createCollectionForm, BindingResult result){

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        Optional<Shop> shop = shopService.findById(createCollectionForm.getShopId());
        if (!shop.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found shop at id: " + createCollectionForm.getShopId()));
        }

        if (collectionService.existsByNameIgnoreCaseAndShopId(createCollectionForm.getName(), shop.get().getId())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildSuccessMessage("Collection with name: " + createCollectionForm.getName() + " are already exist!"));
        }

        Collection collection = Collection.builder()
                .name(createCollectionForm.getName())
                .products(new HashSet<>())
                .shop(shop.get())
                .build();

        collectionService.save(collection);
        Set<Collection> shopCollection = collectionService.findByShopId(shop.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Create new collection successfully!", shopCollection));
    }
}
