package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.District;
import com.e_commerce.repository.IDistrictRepository;
import com.e_commerce.service.IDistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DistrictServiceIMPL implements IDistrictService {

    private final IDistrictRepository districtRepository;

    @Override
    public List<District> findAll() {
        return districtRepository.findAll();
    }

    @Override
    public Optional<District> findById(Long id) {
        return districtRepository.findById(id);
    }

    @Override
    public District save(District district) {
        return districtRepository.save(district);
    }

    @Override
    public void deleteById(Long id) {
        districtRepository.deleteById(id);
    }
}
