package com.e_commerce.service;

import org.springframework.validation.BindingResult;

public interface IValidateService {

    boolean isValidForm(BindingResult result);

}
