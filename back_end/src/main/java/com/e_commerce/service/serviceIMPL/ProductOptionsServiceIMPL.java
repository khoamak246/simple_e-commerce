package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.ProductOptionDTO;
import com.e_commerce.dto.request.UpdateProductOptionForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Product;
import com.e_commerce.model.ProductOptions;
import com.e_commerce.repository.IProductOptionsRepository;
import com.e_commerce.service.IProductOptionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ProductOptions findById(Long id) {
        Optional<ProductOptions> productOptions = productOptionsRepository.findById(id);
        if (!productOptions.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found productOptions at id: " + id);
        }
        return productOptions.get();
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
    public Set<ProductOptions> createByProductOptionsForm(Set<ProductOptionDTO> productOptionList, Product product) {
        Set<ProductOptions> productOptions = new HashSet<>();
        productOptionList.forEach(productOption -> {
            ProductOptions newProductOption = ProductOptions.builder()
                    .name(productOption.getName())
                    .price(productOption.getPrice())
                    .stock(productOption.getStock())
                    .product(product)
                    .build();

            productOptions.add(save(newProductOption));
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
        if (!check) {
            throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Not match product option form!");
        } else {
            return true;
        }
    }

    @Override
    public ProductOptions updateProductOptionsByForm(ProductOptions productOption, UpdateProductOptionForm updateProductOptionForm) {
        if (updateProductOptionForm.getName() != null) {
            productOption.setName(updateProductOptionForm.getName());
        }


        if (updateProductOptionForm.getPrice() != null) {
            productOption.setPrice(updateProductOptionForm.getPrice());
        }

        if (updateProductOptionForm.getStock() != null) {
            productOption.setStock(updateProductOptionForm.getStock());
        }
        return productOption;
    }
}
