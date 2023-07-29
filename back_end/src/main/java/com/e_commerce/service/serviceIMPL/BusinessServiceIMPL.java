package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Business;
import com.e_commerce.repository.IBusinessRepository;
import com.e_commerce.service.IBusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BusinessServiceIMPL implements IBusinessService {

    private final IBusinessRepository businessRepository;

    @Override
    public List<Business> findAll() {
        return businessRepository.findAll();
    }

    @Override
    public Optional<Business> findById(Long id) {
        return businessRepository.findById(id);
    }

    @Override
    public Business save(Business business) {
        return businessRepository.save(business);
    }

    @Override
    public void deleteById(Long id) {
        businessRepository.deleteById(id);
    }

    @Override
    public Set<Business> findByBusinessIsEmpty() {
        return businessRepository.findByBusinessIsEmpty();
    }


}
