package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.UpdateCollectionForm;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Collection;
import com.e_commerce.model.Product;
import com.e_commerce.repository.ICollectionRepository;
import com.e_commerce.service.ICollectionService;
import com.e_commerce.service.IProductService;
import com.e_commerce.service.IShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CollectionServiceIMPL implements ICollectionService {

    private final ICollectionRepository collectionRepository;
    private final IProductService productService;

    @Override
    public List<Collection> findAll() {
        return collectionRepository.findAll();
    }

    @Override
    public Collection findById(Long id) {
        Optional<Collection> collection = collectionRepository.findById(id);
        if (!collection.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found collection at id: " + id);
        }
        return collection.get();
    }

    @Override
    public Collection save(Collection collection) {
        return collectionRepository.save(collection);
    }

    @Override
    public void deleteById(Long id) {
        collectionRepository.deleteById(id);
    }


    @Override
    public boolean existsByNameIgnoreCaseAndShopId(String name, Long shopId) {
        boolean result = collectionRepository.existsByNameIgnoreCaseAndShopId(name.trim(), shopId);
        if (result) {
            throw new ApiRequestException(HttpStatus.NOT_ACCEPTABLE, "Collection with name: " + name.trim() + " are already exist!");
        }
        return false;
    }

    @Override
    public Set<Collection> findByShopId(Long shopId) {
        return collectionRepository.findByShopId(shopId);
    }

    @Override
    public Collection updateCollectionFormAndCollection(Collection collection, UpdateCollectionForm updateCollectionForm) {

        String name = updateCollectionForm.getName();
        if (name != null) {
            if (name.length() > 120) {
                throw new ApiRequestException(HttpStatus.BAD_REQUEST, "Name size can not over 120 letter!");
            }
            collection.setName(name);
        }

        if (updateCollectionForm.getProducts() != null) {
            Set<Product> products = productService.createSetProductFromDtoForm(updateCollectionForm.getProducts());
            if (products == null) {
                throw new ApiRequestException(HttpStatus.NOT_FOUND, "Contain not existing product!");
            }

            collection.setProducts(products);
        }
        return collection;
    }
}
