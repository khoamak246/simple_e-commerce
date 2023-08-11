package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.PaymentWay;
import com.e_commerce.repository.IPaymentWayRepository;
import com.e_commerce.service.IPaymentWayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentWayServiceIMPL implements IPaymentWayService {

    private final IPaymentWayRepository paymentWayRepository;

    @Override
    public List<PaymentWay> findAll() {
        return paymentWayRepository.findAll();
    }

    @Override
    public PaymentWay findById(Long id) {
        Optional<PaymentWay> paymentWay = paymentWayRepository.findById(id);
        if (!paymentWay.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found paymentWay at id: " + id);
        }
        return paymentWay.get();
    }

    @Override
    public PaymentWay save(PaymentWay paymentWay) {
        return paymentWayRepository.save(paymentWay);
    }

    @Override
    public void deleteById(Long id) {
        paymentWayRepository.deleteById(id);
    }
}
