package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.ProductOptionDTO;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.repository.IProductOptionsRepository;
import com.e_commerce.service.IProductOptionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductOptionsServiceIMPL implements IProductOptionsService {

    private final IProductOptionsRepository productOptionsRepository;

    @Override
    public List<ProductOptions> findAll() {
        return productOptionsRepository.findAll();
    }

    @Override
    public Optional<ProductOptions> findById(Long id) {
        return productOptionsRepository.findById(id);
    }

    @Override
    public ProductOptions save(ProductOptions productOptions) {
        return productOptionsRepository.save(productOptions);
    }

    @Override
    public void deleteById(Long id) {
        productOptionsRepository.deleteById(id);
    }

    @Override
    public Set<ProductOptions> createByProductOptionsForm(Set<ProductOptionDTO> productOptionList) {
        Set<ProductOptions> productOptions = new HashSet<>();
        productOptionList.forEach(productOption -> {
            ProductOptions newProductOption = ProductOptions.builder()
                    .name(productOption.getName())
                    .price(productOption.getPrice())
                    .stock(productOption.getStock())
                    .build();

            productOptions.add(newProductOption);
        });
        return productOptions;
    }

    @Override
    public boolean isValidProductOptionsForm(Set<ProductOptionDTO> productOptionList) {
        boolean check = true;
        if (productOptionList.size() != 1){
            for (ProductOptionDTO productOption: productOptionList) {
                if (productOption.getName() == null) {
                    check = false;
                    break;
                }
            }

        }
        return check;
    }
}
