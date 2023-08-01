package com.e_commerce.repository;

import com.e_commerce.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoomRepository extends JpaRepository<Room, Long> {
}
