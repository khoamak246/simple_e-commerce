package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Collection;
import com.e_commerce.repository.ICollectionRepository;
import com.e_commerce.service.ICollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CollectionServiceIMPL implements ICollectionService {

    private final ICollectionRepository collectionRepository;

    @Override
    public List<Collection> findAll() {
        return collectionRepository.findAll();
    }

    @Override
    public Optional<Collection> findById(Long id) {
        return collectionRepository.findById(id);
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
        return collectionRepository.existsByNameIgnoreCaseAndShopId(name.trim(), shopId);
    }

    @Override
    public Set<Collection> findByShopId(Long shopId) {
        return collectionRepository.findByShopId(shopId);
    }
}
