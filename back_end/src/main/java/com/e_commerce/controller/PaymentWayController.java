package com.e_commerce.controller;

import com.e_commerce.dto.response.ResponseMessage;
import com.e_commerce.service.IPaymentWayService;
import com.e_commerce.utils.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/paymentWay")
@RequiredArgsConstructor
public class PaymentWayController {

    private final IPaymentWayService paymentWayService;

    @GetMapping("")
    public ResponseEntity<ResponseMessage> findAllPaymentWay() {
        return ResponseEntity.ok(Utils.buildSuccessMessage("Query successfully!", paymentWayService.findAll()));
    }

}
