package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Review;
import com.e_commerce.repository.IReviewRepository;
import com.e_commerce.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceIMPL implements IReviewService {

    private final IReviewRepository reviewRepository;

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }
}
