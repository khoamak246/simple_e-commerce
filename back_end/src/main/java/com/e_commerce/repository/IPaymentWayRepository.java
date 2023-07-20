package com.e_commerce.repository;

import com.e_commerce.model.PaymentWay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentWayRepository extends JpaRepository<PaymentWay, Long> {
}
