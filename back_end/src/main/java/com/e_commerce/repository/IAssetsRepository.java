package com.e_commerce.repository;

import com.e_commerce.model.Assets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAssetsRepository extends JpaRepository<Assets, Long> {
}
