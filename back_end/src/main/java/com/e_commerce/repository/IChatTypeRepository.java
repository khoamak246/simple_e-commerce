package com.e_commerce.repository;

import com.e_commerce.model.ChatContentType;
import com.e_commerce.model.ChatType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IChatTypeRepository extends JpaRepository<ChatType, Long> {
    Optional<ChatType> findByName(ChatContentType name);
}
