package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Product;
import com.e_commerce.repository.IProductRepository;
import com.e_commerce.service.IProductService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductServiceIMPL implements IProductService {

    private final IProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
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
            Optional<Product> product = findById(productId);
            if (!product.isPresent()) {
                return null;
            } else {
                products.add(product.get());
            }
        }
        return products;
    }

    @Override
    public Set<Product> findByShopId(Long shopId) {
        return productRepository.findByShopId(shopId);
    }
}
