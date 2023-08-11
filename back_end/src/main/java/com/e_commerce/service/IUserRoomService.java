package com.e_commerce.service;

import com.e_commerce.dto.request.ChatMessage;
import com.e_commerce.dto.response.UserRoomResponse;
import com.e_commerce.model.UserRoom;
import com.e_commerce.service.design.IGenericService;

import java.util.List;

public interface IUserRoomService extends IGenericService<UserRoom> {
    List<UserRoom> findByUserInfoIdOrderByLatsAccessDesc(Long userInfoId);
    UserRoom findByUserInfoIdAndRoomId(Long userInfoId, Long roomId);
    UserRoomResponse saveNewChatToUserRoomFromChatMessage(ChatMessage chatMessage);
}
