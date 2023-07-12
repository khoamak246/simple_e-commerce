package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.ProvinceCity;
import com.e_commerce.repository.IProvinceCityRepository;
import com.e_commerce.service.IProvinceCityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProvinceCityServiceIMPL implements IProvinceCityService {

    private final IProvinceCityRepository provinceRepository;

    @Override
    public List<ProvinceCity> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Optional<ProvinceCity> findById(Long id) {
        return provinceRepository.findById(id);
    }

    @Override
    public ProvinceCity save(ProvinceCity provinceCity) {
        return provinceRepository.save(provinceCity);
    }

    @Override
    public void deleteById(Long id) {
        provinceRepository.deleteById(id);
    }
}
