package com.e_commerce.exception;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AppException {

    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;


}
