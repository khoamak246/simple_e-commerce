package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.PaymentWay;
import com.e_commerce.repository.IPaymentWayRepository;
import com.e_commerce.service.IPaymentWayService;
import lombok.RequiredArgsConstructor;
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
    public Optional<PaymentWay> findById(Long id) {
        return paymentWayRepository.findById(id);
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
