package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.District;
import com.e_commerce.model.ProvinceCity;
import com.e_commerce.repository.IProvinceCityRepository;
import com.e_commerce.service.IProvinceCityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ProvinceCity findById(Long id) {
        Optional<ProvinceCity> provinceCity = provinceRepository.findById(id);
        if (!provinceCity.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found provinceCity at id: " + id);
        }
        return provinceCity.get();
    }

    @Override
    public ProvinceCity save(ProvinceCity provinceCity) {
        return provinceRepository.save(provinceCity);
    }

    @Override
    public void deleteById(Long id) {
        provinceRepository.deleteById(id);
    }

    @Override
    public boolean isDistrictInProvinceCity(ProvinceCity provinceCity, District district) {
        if (!provinceCity.getDistrict().contains(district)) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found district with id = " + district.getId() + " in province/city id: " + provinceCity.getId());
        }
        return true;
    }
}
