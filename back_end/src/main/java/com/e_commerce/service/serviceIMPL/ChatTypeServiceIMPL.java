package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.ChatContentType;
import com.e_commerce.model.ChatType;
import com.e_commerce.repository.IChatTypeRepository;
import com.e_commerce.service.IChatTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatTypeServiceIMPL implements IChatTypeService {

    private final IChatTypeRepository chatTypeRepository;

    @Override
    public Optional<ChatType> findByName(ChatContentType name) {
        return chatTypeRepository.findByName(name);
    }

}
