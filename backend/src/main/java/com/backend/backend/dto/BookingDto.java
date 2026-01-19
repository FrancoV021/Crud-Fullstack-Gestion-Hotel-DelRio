package com.backend.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDto {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestFullName;
    private String guestEmail;
    private Integer numOfAdults;
    private Integer numOfChildren;
    private Integer totalNumOfGuests;
    private String bookingConfirmationCode;
    private RoomDto room;
}
