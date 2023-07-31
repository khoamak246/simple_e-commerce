package com.e_commerce.service;

import com.e_commerce.model.ChatContentType;
import com.e_commerce.model.ChatType;

import java.util.Optional;

public interface IChatTypeService {
    Optional<ChatType> findByName(ChatContentType name);
}
