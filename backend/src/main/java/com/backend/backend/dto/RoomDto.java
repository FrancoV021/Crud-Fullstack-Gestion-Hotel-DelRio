package com.backend.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class RoomDto {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String roomPhotoUrl;
    private String roomDescription;
    private List<BookingDto> bookings;
}

