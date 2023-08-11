package com.e_commerce.controller;


import com.e_commerce.dto.request.CreateReviewForm;
import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.model.Review;
import com.e_commerce.service.IReviewService;
import com.e_commerce.service.IUserService;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final IUserService userService;
    private final IReviewService reviewService;
    private final IValidateService validateRegex;

    @PostMapping("")
    @Transactional
    public ResponseEntity<ResponseMessage> saveNewReview(@Validated @RequestBody CreateReviewForm createReviewForm, BindingResult result) {
        validateRegex.isValidForm(result);
        userService.isUserIdEqualUserPrincipalId(createReviewForm.getUserId());
        Review justSavedReview = reviewService.createNewReview(createReviewForm);
        return ResponseEntity.ok(Utils.buildSuccessMessage("Create new review successfully!", justSavedReview));
    }

}
