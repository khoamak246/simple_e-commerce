package com.e_commerce.exception;

import com.e_commerce.utils.constant.ValidationRegex;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@RestControllerAdvice
@Slf4j
public class ApiExceptionHandler {
    
    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e) {
        AppException exception = AppException.builder()
                .message(e.getMessage())
                .httpStatus(e.getStatus())
                .timestamp(ZonedDateTime.now(ZoneId.of("Z")))
                .build();

        return ResponseEntity.status(e.getStatus()).body(exception);
    }
    

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND )
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        AppException exception = AppException.builder()
                .message("Not found URL: " + ex.getRequestURL())
                .httpStatus(HttpStatus.NOT_FOUND)
                .timestamp(ZonedDateTime.now(ZoneId.of("Z")))
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handle(Exception ex,
                                         HttpServletRequest request, HttpServletResponse response) {
        String message;
        HttpStatus status;
        if (ex instanceof MethodArgumentTypeMismatchException) {
            status = HttpStatus.BAD_REQUEST;
            message = "Miss match value: [" + ((MethodArgumentTypeMismatchException) ex).getValue() + "] with parameter: [" + ((MethodArgumentTypeMismatchException) ex).getName() + "]";
        } else {
            ex.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Unknown error";
        }

        log.warn(message);
        AppException exception = AppException.builder()
                .message(message)
                .httpStatus(status)
                .timestamp(ZonedDateTime.now(ZoneId.of("Z")))
                .build();
        return ResponseEntity.status(status).body(exception);
    }
}
