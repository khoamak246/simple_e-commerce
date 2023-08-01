package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.OrderItems;
import com.e_commerce.repository.IOrderItemsRepository;
import com.e_commerce.service.IOrderItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderItemsServiceIMPL implements IOrderItemsService {

    private final IOrderItemsRepository orderItemsRepository;

    @Override
    public List<OrderItems> findAll() {
        return orderItemsRepository.findAll();
    }

    @Override
    public Optional<OrderItems> findById(Long id) {
        return orderItemsRepository.findById(id);
    }

    @Override
    public OrderItems save(OrderItems orderItems) {
        return orderItemsRepository.save(orderItems);
    }

    @Override
    public void deleteById(Long id) {
        orderItemsRepository.deleteById(id);
    }

    @Override
    public Set<OrderItems> findByShopId(Long shopId) {
        return orderItemsRepository.findByShopId(shopId);
    }

    @Override
    public Set<OrderItems> findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(Long shopId, String status) {
        return orderItemsRepository.findTop10ByShopIdAndStatusOrderByOrderCreatedDateDesc(shopId, status);
    }
}
