package com.e_commerce.utils.util;


import com.e_commerce.dto.response.ResponseMessage;

public class Utils {

    public static ResponseMessage buildSuccessMessage(String message, Object data) {
        return ResponseMessage.builder()
                        .status("OK")
                        .message(message)
                        .data(data)
                        .build();

    }

    public static ResponseMessage buildSuccessMessage(String message) {
        return ResponseMessage.builder()
                        .status("OK")
                        .message(message)
                        .data("")
                        .build();

    }

}
