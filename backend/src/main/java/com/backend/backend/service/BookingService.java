package com.backend.backend.service;


import com.backend.backend.dto.BookingDto;
import com.backend.backend.entity.Booking;
import com.backend.backend.entity.Room;
import com.backend.backend.entity.User;
import com.backend.backend.repository.BookingRepository;
import com.backend.backend.repository.RoomRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.request.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    //nuevo
    public List<BookingDto> getBookingsByEmail(String email) {
        List<Booking> bookings = bookingRepository.findByUserEmail(email);
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    //---

    public String saveBooking(Long roomId, BookingRequest bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setGuestFullName(bookingRequest.getGuestFullName());
        booking.setGuestEmail(bookingRequest.getGuestEmail());
        booking.setNumOfAdults(bookingRequest.getNumOfAdults());
        booking.setNumOfChildren(bookingRequest.getNumOfChildren());
        booking.calculateTotalNumberOfGuests();
        booking.setBookingConfirmationCode(UUID.randomUUID().toString());
        booking.setRoom(room);
        booking.setUser(user);

        bookingRepository.save(booking);
        return booking.getBookingConfirmationCode();
    }

    public BookingDto findByConfirmationCode(String confirmationCode) {
        Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new RuntimeException("Booking not found with confirmation code: " + confirmationCode));
        return convertToDto(booking);
    }

    public List<BookingDto> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<BookingDto> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    //reparacion  (ctrl z x2)
    private BookingDto convertToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setGuestFullName(booking.getGuestFullName());
        dto.setGuestEmail(booking.getGuestEmail());
        dto.setNumOfAdults(booking.getNumOfAdults());
        dto.setNumOfChildren(booking.getNumOfChildren());
        dto.setTotalNumOfGuests(booking.getTotalNumOfGuests());
        dto.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        // --- SOLUCIÓN AL ROOM NULL ---
        if (booking.getRoom() != null) {
            com.backend.backend.dto.RoomDto roomDto = new com.backend.backend.dto.RoomDto();
            roomDto.setId(booking.getRoom().getId());
            roomDto.setRoomType(booking.getRoom().getRoomType());
            roomDto.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDto.setRoomDescription(booking.getRoom().getRoomDescription());
            // Si tienes la foto en Base64 también la puedes pasar:
            // roomDto.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            dto.setRoom(roomDto); // <--- Aquí se asigna y deja de ser null
        }
        return dto;
    }
}
