package com.e_commerce.repository;

import com.e_commerce.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ICollectionRepository extends JpaRepository<Collection, Long> {
    boolean existsByNameIgnoreCaseAndShopId(String name, Long shopId);

    Set<Collection> findByShopId(Long shopId);

    @Query(value = "delete from collection where id = :id", nativeQuery = true)
    @Modifying
    void deleteById(@Param("id") Long id);
}
