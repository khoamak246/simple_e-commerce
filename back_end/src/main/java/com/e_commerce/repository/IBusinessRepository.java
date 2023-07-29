package com.e_commerce.repository;

import com.e_commerce.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface IBusinessRepository extends JpaRepository<Business, Long> {
    Set<Business> findByBusinessIsEmpty();

}
