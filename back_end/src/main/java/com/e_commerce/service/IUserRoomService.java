package com.e_commerce.service;

import com.e_commerce.model.UserRoom;
import com.e_commerce.service.design.IGenericService;

import java.util.List;
import java.util.Optional;

public interface IUserRoomService extends IGenericService<UserRoom> {
    List<UserRoom> findByUserInfoIdOrderByLatsAccessDesc(Long userInfoId);
    Optional<UserRoom> findByUserInfoIdAndRoomId(Long userInfoId, Long roomId);
}
