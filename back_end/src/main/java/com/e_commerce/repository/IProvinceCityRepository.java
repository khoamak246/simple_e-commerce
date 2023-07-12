package com.e_commerce.repository;

import com.e_commerce.model.ProvinceCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProvinceCityRepository extends JpaRepository<ProvinceCity, Long> {
}
