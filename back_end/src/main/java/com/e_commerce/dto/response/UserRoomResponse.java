package com.e_commerce.dto.response;

import com.e_commerce.model.UserRoom;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserRoomResponse {

    private UserRoom userRoomSender;
    private UserRoom userRoomReceiver;

}
