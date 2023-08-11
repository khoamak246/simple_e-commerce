package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.CreateReviewForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Assets;
import com.e_commerce.model.Product;
import com.e_commerce.model.Review;
import com.e_commerce.model.User;
import com.e_commerce.repository.IReviewRepository;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IReviewService;
import com.e_commerce.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReviewServiceIMPL implements IReviewService {

    private final IReviewRepository reviewRepository;
    private final IUserService userService;
    private final IProductService productService;

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review findById(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (!review.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found review at id: " + id);
        }
        return review.get();
    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Review createNewReview(CreateReviewForm createReviewForm) {
        User user = userService.findById(createReviewForm.getUserId());
        Product product = productService.findById(createReviewForm.getProductId());

        Set<Assets> assets = new HashSet<>();
        createReviewForm.getAssets().forEach(as -> {
            Assets asset = Assets.builder()
                    .url(as.getUrl())
                    .assetType(as.getAssetType())
                    .build();
            assets.add(asset);
        });

        product.setReviewNumber(product.getReviewNumber() + 1);
        double newRated = (product.getRate() + createReviewForm.getRated()) / product.getReviewNumber();
        product.setRate(newRated);
        productService.save(product);


        Review newReview = Review.builder()
                .content(createReviewForm.getContent())
                .rated(createReviewForm.getRated())
                .assets(assets)
                .product(product)
                .createdDate(LocalDate.now().toString())
                .userInfo(user.getUserInfo())
                .optionName(createReviewForm.getOptionName())
                .build();

        return save(newReview);
    }
}
