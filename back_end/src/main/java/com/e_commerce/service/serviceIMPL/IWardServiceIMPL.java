package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Ward;
import com.e_commerce.repository.IWardRepository;
import com.e_commerce.service.IWardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IWardServiceIMPL implements IWardService {

    private final IWardRepository wardRepository;

    @Override
    public List<Ward> findAll() {
        return wardRepository.findAll();
    }

    @Override
    public Ward findById(Long id) {
        Optional<Ward> ward = wardRepository.findById(id);
        if (!ward.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found ward at id: " + id);
        }
        return ward.get();
    }

    @Override
    public Ward save(Ward ward) {
        return wardRepository.save(ward);
    }

    @Override
    public void deleteById(Long id) {
        wardRepository.deleteById(id);
    }
}
