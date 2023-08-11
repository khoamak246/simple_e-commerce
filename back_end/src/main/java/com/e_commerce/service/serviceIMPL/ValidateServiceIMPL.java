package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.service.IValidateService;
import com.e_commerce.utils.constant.ValidationRegex;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class ValidateServiceIMPL implements IValidateService {

    @Override
    public boolean isValidForm(BindingResult result) {
        if (result.hasErrors()) {
            throw new ApiRequestException(HttpStatus.BAD_REQUEST, ValidationRegex.INVALID_MESSAGE);
        }
        return true;
    }
}
