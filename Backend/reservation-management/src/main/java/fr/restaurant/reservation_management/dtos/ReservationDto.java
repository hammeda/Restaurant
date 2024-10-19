package fr.restaurant.reservation_management.dtos;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationDto {
    private long id;
    private int version;
    @NotNull(message = "La date et l'heure de la réservation ne peuvent pas être nulles")
    @Future(message = "La date et l'heure de la réservation doivent être dans le futur")
    private LocalDate date;
    private LocalTime time;
    private int numberOfGuests;
    private long restaurantTableId; // ID de la table réservée
    private long userId;  // ID de l'utilisateur qui a fait la réservation
}
