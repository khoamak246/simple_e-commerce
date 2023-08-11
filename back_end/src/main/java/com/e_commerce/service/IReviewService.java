package com.e_commerce.service;

import com.e_commerce.dto.request.CreateReviewForm;
import com.e_commerce.model.Product;
import com.e_commerce.model.Review;
import com.e_commerce.model.User;
import com.e_commerce.service.design.IGenericService;

public interface IReviewService extends IGenericService<Review> {

    Review createNewReview(CreateReviewForm createReviewForm);

}
