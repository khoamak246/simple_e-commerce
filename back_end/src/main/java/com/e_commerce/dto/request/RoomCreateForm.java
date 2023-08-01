package com.e_commerce.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomCreateForm {
    @NotNull
    private Long userId;

    @NotNull
    private Long shopId;

}
