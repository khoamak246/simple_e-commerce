package com.e_commerce.service.serviceIMPL;

import com.e_commerce.dto.request.ChatMessage;
import com.e_commerce.dto.response.UserRoomResponse;
import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.*;
import com.e_commerce.repository.IUserRoomRepository;
import com.e_commerce.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRoomServiceIMPL implements IUserRoomService {

    private final IUserRoomRepository userRoomRepository;
    private final IRoomService roomService;
    private final IUserService userService;
    private final IChatTypeService chatTypeService;
    private final IChatService chatService;


    @Override
    public List<UserRoom> findAll() {
        return userRoomRepository.findAll();
    }

    @Override
    public UserRoom findById(Long id) {
        Optional<UserRoom> userRoom = userRoomRepository.findById(id);
        if (!userRoom.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found userRoom at id: " + id);
        }
        return userRoom.get();
    }

    @Override
    public UserRoom save(UserRoom userRoom) {
        return userRoomRepository.save(userRoom);
    }

    @Override
    public void deleteById(Long id) {
        userRoomRepository.deleteById(id);
    }


    @Override
    public List<UserRoom> findByUserInfoIdOrderByLatsAccessDesc(Long userId) {
        return userRoomRepository.findByUserInfoIdOrderByLatsAccessDesc(userId);
    }

    @Override
    public UserRoom findByUserInfoIdAndRoomId(Long userId, Long roomId) {
        Optional<UserRoom> userRoom =  userRoomRepository.findByUserInfoIdAndRoomId(userId, roomId);
        if (!userRoom.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found userRoom at userId: " + userId + " and roomId: " + roomId);
        }
        return userRoom.get();
    }

    @Override
    public UserRoomResponse saveNewChatToUserRoomFromChatMessage(ChatMessage chatMessage) {
        Room room = roomService.findById(chatMessage.getRoomId());
        Optional<User> senderUser = userService.findByUsername(chatMessage.getSenderName());
        if (!senderUser.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found user at username: " + chatMessage.getSenderName());
        }
        Optional<User> receiverUser = userService.findByUsername(chatMessage.getReceiverName());
        if (!receiverUser.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found receiverUser at username: " + chatMessage.getReceiverName());
        }

        Chat newChat = Chat.builder()
                .createdTime(System.currentTimeMillis())
                .userInfo(senderUser.get().getUserInfo())
                .room(room)
                .build();

        ChatType textChatType = null;
        switch (chatMessage.getChatContentType()) {
            case "TEXT":
                textChatType = chatTypeService.findByName(ChatContentType.TEXT).orElseThrow(() -> new IllegalArgumentException("Not found content type at: " + chatMessage.getChatContentType()));
                newChat.setContent(chatMessage.getContent());
                break;
            case "IMAGE":
                textChatType = chatTypeService.findByName(ChatContentType.IMAGE).orElseThrow(() -> new IllegalArgumentException("Not found content type at: " + chatMessage.getChatContentType()));
                newChat.setUrl(chatMessage.getContent());
                break;
            case "VIDEO":
                textChatType = chatTypeService.findByName(ChatContentType.VIDEO).orElseThrow(() -> new IllegalArgumentException("Not found content type at: " + chatMessage.getChatContentType()));
                newChat.setUrl(chatMessage.getContent());
                break;
        }

        newChat.setChatType(textChatType);
        chatService.save(newChat);

        UserRoom userRoomSender = findByUserInfoIdAndRoomId(senderUser.get().getUserInfo().getId(), room.getId());
        UserRoom userRoomReceiver = findByUserInfoIdAndRoomId(receiverUser.get().getUserInfo().getId(), room.getId());

        long lastAccessTime = System.currentTimeMillis();
        userRoomSender.setLatsAccess(lastAccessTime);
        UserRoom justUpdateUserRoomSenderUser = save(userRoomSender);
        return UserRoomResponse.builder()
                .userRoomSender(justUpdateUserRoomSenderUser)
                .userRoomReceiver(userRoomReceiver)
                .build();
    }
}
