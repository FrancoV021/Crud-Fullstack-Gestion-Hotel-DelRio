package com.backend.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    @Column(nullable = false)
    private String guestFullName;

    @Column(nullable = false)
    private String guestEmail;

    @Column(nullable = false)
    private Integer numOfAdults;

    @Column(nullable = false)
    private Integer numOfChildren;

    @Column(nullable = false)
    private Integer totalNumOfGuests;

    @Column(nullable = false, unique = true)
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void calculateTotalNumberOfGuests() {
        this.totalNumOfGuests = this.numOfAdults + this.numOfChildren;
    }
}