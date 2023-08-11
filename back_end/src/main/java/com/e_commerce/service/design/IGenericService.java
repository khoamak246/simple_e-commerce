package com.e_commerce.service.design;


import java.util.List;
import java.util.Optional;

public interface IGenericService<T> {
    List<T> findAll();
    T findById(Long id);
    T save(T t);
    void deleteById(Long id);
}
