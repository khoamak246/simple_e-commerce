package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.UpdateProductForm;
import com.e_commerce.dto.response.ProductResponse;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.*;
import com.e_commerce.repository.IBusinessRepository;
import com.e_commerce.repository.IProductRepository;
import com.e_commerce.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceIMPL implements IProductService {

    private final IProductRepository productRepository;
    private final IBusinessRepository businessRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found product at id: " + id);
        }
        return product.get();
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }


    @Override
    public Set<Product> findByNameContainingIgnoreCase(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Set<Product> createSetProductFromDtoForm(Set<Long> productsDtoForm) {
        Set<Product> products = new HashSet<>();

        if (productsDtoForm == null){
            return products;
        }

        for (Long productId : productsDtoForm) {
            Product product  = findById(productId);
            products.add(product);
        }
        return products;
    }

    @Override
    public Set<Product> findByShopId(Long shopId) {
        return productRepository.findByShopId(shopId);
    }

    @Override
    public Set<ProductResponse> findTop10ProductHaveMaxNumberOrder(Long shopId) {
        return productRepository.findTop10ProductHaveMaxNumberOrder(shopId);
    }

    @Override
    public Set<ProductResponse> findTop10ProductHaveMaxFavorites(Long shopId) {
        return productRepository.findTop10ProductHaveMaxFavorites(shopId);
    }

    @Override
    public Optional<ProductResponse> findProductHaveMaxCancelOrderPercent(Long shopId) {
        return productRepository.findProductHaveMaxCancelOrderPercent(shopId);
    }

    @Override
    public Optional<ProductResponse> findProductHaveMaxReturnOrderPercent(Long shopId) {
        return productRepository.findProductHaveMaxReturnOrderPercent(shopId);
    }

    @Override
    public Set<ProductResponse> findTopFiveProductHaveMaxRevenue(Long shopId) {
        return productRepository.findTopFiveProductHaveMaxRevenue(shopId);
    }

    @Override
    public Set<ProductResponse> findTopPaymentProduct(int offsetNumber, int limitNumber) {
        return productRepository.findTopPaymentProduct(offsetNumber, limitNumber);
    }

    @Override
    public Set<Product> findTop10ByShopIdOrderByVisitNumberDesc(Long shopId) {
        return productRepository.findTop10ByShopIdOrderByVisitNumberDesc(shopId);
    }

    @Override
    public int countByShopId(Long shopId) {
        return productRepository.countByShopId(shopId);
    }

    @Override
    public double getMinPriceProductOption(Product product) {
        return product.getProductOptions().stream().mapToDouble(ProductOptions::getPrice).min().orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Product updateProductByFrom(Product product, UpdateProductForm updateProductForm) {
        if (updateProductForm.getName() != null) {
            product.setName(updateProductForm.getName());
        }

        if (updateProductForm.getDescription() != null) {
            product.setDescription(updateProductForm.getDescription());
        }

        if (updateProductForm.getOnSale() != null) {
            product.setOnSale(updateProductForm.getOnSale());
        }

        if (updateProductForm.getBlock() != null) {
            product.setBlock(updateProductForm.getBlock());
        }

        if (updateProductForm.getVisitNumber() != null) {
            product.setVisitNumber(updateProductForm.getVisitNumber());
        }

        if (updateProductForm.getBusinessId() != null) {
            Optional<Business> business = businessRepository.findById(updateProductForm.getBusinessId());
            if (!business.isPresent()) {
                throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found business at id: " + updateProductForm.getBusinessId());
            }
            product.setBusiness(business.get());
        }
        return product;
    }

    @Override
    public Set<UserInfo> addProductFavorites(User user, Product product) {
        List<UserInfo> currentFavorites = new ArrayList<>(product.getFavorites());
        if (currentFavorites.contains(user.getUserInfo())) {
            currentFavorites.remove(user.getUserInfo());
        } else {
            currentFavorites.add(user.getUserInfo());
        }
        return new HashSet<>(currentFavorites);
    }
}
