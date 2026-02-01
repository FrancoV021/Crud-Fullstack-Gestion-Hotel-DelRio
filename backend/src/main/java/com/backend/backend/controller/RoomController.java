package com.backend.backend.controller;

import com.backend.backend.dto.RoomDto;
import com.backend.backend.entity.Room;
import com.backend.backend.response.ApiResponse;
import com.backend.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Room>> addRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("roomDescription") String roomDescription) {
        try {
            Room savedRoom = roomService.addRoom(photo, roomType, roomPrice, roomDescription);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Room added successfully", savedRoom));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error adding room: " + e.getMessage()));
        }
    }

    @GetMapping("/types")
    public ResponseEntity<ApiResponse<List<String>>> getRoomTypes() {
        List<String> roomTypes = roomService.getAllRoomTypes();
        return ResponseEntity.ok(ApiResponse.success("Room types retrieved", roomTypes));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<RoomDto>>> getAllRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(ApiResponse.success("All rooms retrieved", rooms));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomDto>> getRoomById(@PathVariable Long id) {
        try {
            RoomDto room = roomService.getRoomById(id);
            return ResponseEntity.ok(ApiResponse.success("Room retrieved", room));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.ok(ApiResponse.success("Room deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RoomDto>> updateRoom(
            @PathVariable Long id,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) BigDecimal roomPrice,
            @RequestParam(required = false) String roomDescription,
            @RequestParam(required = false) MultipartFile photo) {
        try {
            Room updatedRoom = roomService.updateRoom(id, roomType, roomPrice, roomDescription, photo);
            RoomDto roomDto = convertToDto(updatedRoom);
            return ResponseEntity.ok(ApiResponse.success("Room updated successfully", roomDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error updating room: " + e.getMessage()));
        }
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

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<RoomDto>>> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam String roomType) {
        List<RoomDto> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        return ResponseEntity.ok(ApiResponse.success("Available rooms retrieved", availableRooms));
    }
}

