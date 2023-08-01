package com.e_commerce.repository;

import com.e_commerce.model.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRoomRepository extends JpaRepository<UserRoom, Long> {
    List<UserRoom> findByUserInfoIdOrderByLatsAccessDesc(Long userInfoId);
    Optional<UserRoom> findByUserInfoIdAndRoomId(Long userInfoId, Long roomId);
}
