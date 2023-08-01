package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.Chat;
import com.e_commerce.repository.IChatRepository;
import com.e_commerce.service.IChatService;
import lombok.RequiredArgsConstructor;
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
    public Optional<Chat> findById(Long id) {
        return chatRepository.findById(id);
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
