package com.backend.backend.controller;

import com.backend.backend.dto.BookingDto;
import com.backend.backend.request.BookingRequest;
import com.backend.backend.response.ApiResponse;
import com.backend.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/room/{roomId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<String>> saveBooking(
            @PathVariable Long roomId,
            @Valid @RequestBody BookingRequest bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Booking successful!", confirmationCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<ApiResponse<BookingDto>> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookingDto booking = bookingService.findByConfirmationCode(confirmationCode);
            return ResponseEntity.ok(ApiResponse.success("Booking found", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<BookingDto>>> getAllBookings() {
        List<BookingDto> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success("All bookings retrieved", bookings));
    }

    @GetMapping("/user/{email}")
    @PreAuthorize("#email == authentication.name or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<BookingDto>>> getBookingsByEmail(
            @PathVariable String email) {

        List<BookingDto> bookings = bookingService.getBookingsByEmail(email);
        return ResponseEntity.ok(ApiResponse.success("User bookings retrieved", bookings));
    }

    @DeleteMapping("/{bookingId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
