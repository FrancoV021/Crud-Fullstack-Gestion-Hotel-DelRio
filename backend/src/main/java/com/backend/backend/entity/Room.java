package com.backend.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomType; // Standard, Deluxe, Suite, etc.

    @Column(nullable = false)
    private BigDecimal roomPrice;

    @Lob
    @Column(length = 16777215) // MEDIUMBLOB para MySQL
    private String roomPhotoUrl; // Base64 encoded image

    @Column(nullable = false)
    private String roomDescription;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();
}

