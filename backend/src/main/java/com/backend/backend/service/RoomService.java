package com.backend.backend.service;


import com.backend.backend.dto.RoomDto;
import com.backend.backend.entity.Room;
import com.backend.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room addRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription) throws IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        room.setRoomDescription(roomDescription);

        if (photo != null && !photo.isEmpty()) {
            byte[] photoBytes = photo.getBytes();
            String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
            room.setRoomPhotoUrl(base64Photo);
        }

        return roomRepository.save(room);
    }

    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public RoomDto getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return convertToDto(room);
    }

    public void deleteRoom(Long roomId) {
        roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.deleteById(roomId);
    }

    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, String roomDescription, MultipartFile photo) throws IOException {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (roomDescription != null) room.setRoomDescription(roomDescription);

        if (photo != null && !photo.isEmpty()) {
            byte[] photoBytes = photo.getBytes();
            String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
            room.setRoomPhotoUrl(base64Photo);
        }

        return roomRepository.save(room);
    }

    public List<RoomDto> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        List<Room> availableRooms = roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
        return availableRooms.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private RoomDto convertToDto(Room room) {
        RoomDto dto = new RoomDto();
        dto.setId(room.getId());
        dto.setRoomType(room.getRoomType());
        dto.setRoomPrice(room.getRoomPrice());
        dto.setRoomPhotoUrl(room.getRoomPhotoUrl());
        dto.setRoomDescription(room.getRoomDescription());
        return dto;
    }
}