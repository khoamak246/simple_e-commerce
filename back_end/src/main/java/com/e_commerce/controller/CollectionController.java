package com.e_commerce.controller;

import com.e_commerce.dto.request.CreateCollectionForm;
import com.e_commerce.dto.request.UpdateCollectionForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Collection;
import com.e_commerce.model.Shop;
import com.e_commerce.service.ICollectionService;
import com.e_commerce.service.IShopService;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/collection")
@RequiredArgsConstructor
public class CollectionController {
    private final IShopService shopService;
    private final ICollectionService collectionService;
    private final IValidateService validateRegex;

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<ResponseMessage> deleteCollectionById(@PathVariable Long collectionId){
        Collection collection = collectionService.findById(collectionId);

        Long shopId = collection.getShop().getId();
        shopService.isCurrentUserMatchShopUserid(shopId);

        collection.setProducts(new HashSet<>());
        Collection justSavedCollection = collectionService.save(collection);
        collectionService.deleteById(justSavedCollection.getId());

        Set<Collection> shopCollection = collectionService.findByShopId(shopId);
        return ResponseEntity.ok().body(Utils.buildSuccessMessage("Delete collection successfully!", shopCollection));
    }

    @PatchMapping("/{collectionId}")
    public ResponseEntity<ResponseMessage> patchUpdateCollection(@PathVariable Long collectionId, @RequestBody UpdateCollectionForm updateCollectionForm){
        Collection collection = collectionService.findById(collectionId);

        Long shopId = collection.getShop().getId();
        shopService.isCurrentUserMatchShopUserid(shopId);
        Collection afterUpdateCollection = collectionService.updateCollectionFormAndCollection(collection, updateCollectionForm);
        collectionService.save(afterUpdateCollection);
        Set<Collection> shopCollection = collectionService.findByShopId(shopId);
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Update collection successfully!", shopCollection));
    }

    @PostMapping("")
    public ResponseEntity<ResponseMessage> saveNewCollection(@Validated @RequestBody CreateCollectionForm createCollectionForm, BindingResult result){

        validateRegex.isValidForm(result);

        Shop shop = shopService.findById(createCollectionForm.getShopId());
        collectionService.existsByNameIgnoreCaseAndShopId(createCollectionForm.getName(), shop.getId());

        Collection collection = Collection.builder()
                .name(createCollectionForm.getName())
                .products(new HashSet<>())
                .shop(shop)
                .build();

        collectionService.save(collection);
        Set<Collection> shopCollection = collectionService.findByShopId(shop.getId());
        return ResponseEntity.status(HttpStatus.OK).body(Utils.buildSuccessMessage("Create new collection successfully!", shopCollection));
    }
}
