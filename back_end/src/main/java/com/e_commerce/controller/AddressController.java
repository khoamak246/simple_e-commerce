package com.e_commerce.controller;

import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.service.IProvinceCityService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/address")
@RequiredArgsConstructor
public class AddressController {

    private final IProvinceCityService provinceCityService;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findAllProvinceCity(){
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", provinceCityService.findAll()));
    }

}
