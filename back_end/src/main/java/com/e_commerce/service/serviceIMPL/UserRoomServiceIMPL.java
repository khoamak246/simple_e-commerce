package com.e_commerce.service.serviceIMPL;

import com.e_commerce.model.UserRoom;
import com.e_commerce.repository.IUserRoomRepository;
import com.e_commerce.service.IUserRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRoomServiceIMPL implements IUserRoomService {

    private final IUserRoomRepository userRoomRepository;


    @Override
    public List<UserRoom> findAll() {
        return userRoomRepository.findAll();
    }

    @Override
    public Optional<UserRoom> findById(Long id) {
        return userRoomRepository.findById(id);
    }

    @Override
    public UserRoom save(UserRoom userRoom) {
        return userRoomRepository.save(userRoom);
    }

    @Override
    public void deleteById(Long id) {
        userRoomRepository.deleteById(id);
    }


    @Override
    public List<UserRoom> findByUserInfoIdOrderByLatsAccessDesc(Long userId) {
        return userRoomRepository.findByUserInfoIdOrderByLatsAccessDesc(userId);
    }

    @Override
    public Optional<UserRoom> findByUserInfoIdAndRoomId(Long userId, Long roomId) {
        return userRoomRepository.findByUserInfoIdAndRoomId(userId, roomId);
    }
}
