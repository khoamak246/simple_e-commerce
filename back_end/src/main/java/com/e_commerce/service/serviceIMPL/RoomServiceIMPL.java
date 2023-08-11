package com.e_commerce.service.serviceIMPL;

import com.e_commerce.exception.ApiRequestException;
import com.e_commerce.model.Room;
import com.e_commerce.repository.IRoomRepository;
import com.e_commerce.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceIMPL implements IRoomService {

    private final IRoomRepository roomRepository;

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room findById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        if (!room.isPresent()) {
            throw new ApiRequestException(HttpStatus.NOT_FOUND, "Not found at id: " + id);
        }
        return room.get();
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }

}
