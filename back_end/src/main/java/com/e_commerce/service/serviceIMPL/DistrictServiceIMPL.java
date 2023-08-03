package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.District;
import com.e_commerce.model.Ward;
import com.e_commerce.repository.IDistrictRepository;
import com.e_commerce.service.IDistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public District findById(Long id) {
        Optional<District> district = districtRepository.findById(id);
        if (!district.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found district at id: " + id);
        }
        return district.get();
    }

    @Override
    public District save(District district) {
        return districtRepository.save(district);
    }

    @Override
    public void deleteById(Long id) {
        districtRepository.deleteById(id);
    }

    @Override
    public boolean isWardInDistrict(District district, Ward ward) {
        if (!district.getWard().contains(ward)) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found ward with id = " + ward.getId() + " in district id: " + district.getId());
        }
        return true;
    }
}
