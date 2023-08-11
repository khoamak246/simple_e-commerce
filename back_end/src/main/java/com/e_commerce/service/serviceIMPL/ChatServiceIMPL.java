package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Chat;
import com.e_commerce.repository.IChatRepository;
import com.e_commerce.service.IChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceIMPL implements IChatService {

    private final IChatRepository chatRepository;

    @Override
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }

    @Override
    public Chat findById(Long id) {
        Optional<Chat> chat = chatRepository.findById(id);
        if (!chat.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found chat at id: " + id);
        }
        return chat.get();
    }

    @Override
    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public void deleteById(Long id) {
        chatRepository.deleteById(id);
    }
}
