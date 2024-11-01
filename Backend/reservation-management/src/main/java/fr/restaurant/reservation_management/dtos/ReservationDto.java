package fr.restaurant.reservation_management.dtos;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private long id;
    private int version;
    @NotNull(message = "La date et l'heure de la réservation ne peuvent pas être nulles")
    @Future(message = "La date et l'heure de la réservation doivent être dans le futur")
    private LocalDate date;
    private LocalTime time;
    private int numberOfPeople;
    private long restaurantTableId; // ID de la table réservée
    private long userId;  // ID de l'utilisateur qui a fait la réservation
    private String tableName;
    private String clientPrenom;
    private String clientNom;
    private String tablePictureName;
}
