package com.e_commerce.dto.request;

import com.e_commerce.model.ChatMessageStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ChatMessage {

    private String senderName;
    private String receiverName;
    private String content;
    private String chatContentType;
    private Long roomId;
    private ChatMessageStatus chatMessageStatus;


}
