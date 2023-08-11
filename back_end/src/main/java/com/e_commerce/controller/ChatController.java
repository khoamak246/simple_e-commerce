package com.e_commerce.controller;

import com.e_commerce.dto.request.ChatMessage;
import com.e_commerce.dto.response.UserRoomResponse;
import com.e_commerce.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final IUserRoomService userRoomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/public-message")
    @SendTo("/chatroom/{publicRoomId}/public")
    public ChatMessage receivePublicMessage(@Payload ChatMessage chatMessage) {
        System.out.println(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/private-message")
    @Transactional
    public ChatMessage receivePrivateMessage(@Payload ChatMessage chatMessage) {
        UserRoomResponse userRoomResponse = userRoomService.saveNewChatToUserRoomFromChatMessage(chatMessage);

        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getSenderName(),
                "/private",
                userRoomResponse.getUserRoomSender()
        );

        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiverName(),
                "/private",
                userRoomResponse.getUserRoomReceiver()
        );

        return chatMessage;
    }


}
