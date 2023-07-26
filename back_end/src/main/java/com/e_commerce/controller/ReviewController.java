package com.e_commerce.controller;


import com.e_commerce.dto.request.CreateReviewForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Assets;
import com.e_commerce.model.Product;
import com.e_commerce.model.Review;
import com.e_commerce.model.User;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IReviewService;
import com.e_commerce.service.IUserService;
import com.e_commerce.utils.constant.ValidationRegex;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final IUserService userService;
    private final IProductService productService;
    private final IReviewService reviewService;

    @PostMapping("")
    @Transactional
    public ResponseEntity<ResponseMessage> saveNewReview(@Validated @RequestBody CreateReviewForm createReviewForm, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Utils.buildFailMessage(ValidationRegex.INVALID_MESSAGE));
        }

        if (!userService.isUserIdEqualUserPrincipalId(createReviewForm.getUserId())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Utils.buildFailMessage("Not match user!"));
        }

        Optional<User> user = userService.findById(createReviewForm.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found user at id: " + createReviewForm.getUserId()));
        }

        Optional<Product> product = productService.findById(createReviewForm.getProductId());
        if (!product.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Utils.buildFailMessage("Not found product at id: " + createReviewForm.getProductId()));
        }


        Set<Assets> assets = new HashSet<>();
        createReviewForm.getAssets().forEach(as -> {
            Assets asset = Assets.builder()
                    .url(as.getUrl())
                    .assetType(as.getAssetType())
                    .build();
            assets.add(asset);
        });

        product.get().setReviewNumber(product.get().getReviewNumber() + 1);
        double newRated = (product.get().getRate() + createReviewForm.getRated()) / product.get().getReviewNumber();
        product.get().setRate(newRated);
        productService.save(product.get());


        Review newReview = Review.builder()
                .content(createReviewForm.getContent())
                .rated(createReviewForm.getRated())
                .assets(assets)
                .product(product.get())
                .createdDate(LocalDate.now().toString())
                .userInfo(user.get().getUserInfo())
                .optionName(createReviewForm.getOptionName())
                .build();


        Review justSavedReview = reviewService.save(newReview);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new review successfully!", justSavedReview));
    }

}
