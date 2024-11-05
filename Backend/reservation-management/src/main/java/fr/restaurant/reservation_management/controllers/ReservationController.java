package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.ReservationDto;
import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.Localisation;
import fr.restaurant.reservation_management.exceptions.ConflictException;
import fr.restaurant.reservation_management.exceptions.NotFoundException;
import fr.restaurant.reservation_management.services.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    private IReservationService reservationService;


    // Endpoint pour vérifier les tables disponibles
    @GetMapping("/available")
    public ResponseEntity<List<RestaurantTableDto>> getAvailableTables(
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam Localisation localisation,
            @RequestParam int numberOfPeople) {

        // Appel au service avec les chaînes de caractères
        List<RestaurantTableDto> availableTables = reservationService.getAvailableTables(date, time, localisation, numberOfPeople);
        return ResponseEntity.ok(availableTables);
    }


    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        try {
            ReservationDto createdReservationDto = reservationService.createReservation(reservationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservationDto);
        } catch (ConflictException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Table non disponible
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Utilisateur non trouvé
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Erreur générique
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ReservationDto>> getReservationsByUserId(
            @PathVariable long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) { // Ajout du paramètre status

        Page<ReservationDto> reservations = reservationService.getListByUserId(userId, PageRequest.of(page, size), status);
        return ResponseEntity.ok(reservations);
    }


    @GetMapping("/all")
    public ResponseEntity<Page<ReservationDto>> getAllReservations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) { // Ajouter le paramètre status

        Pageable pageable = PageRequest.of(page, size);
        Page<ReservationDto> reservations = reservationService.getAllReservations(pageable, status);

        return ResponseEntity.ok(reservations);
    }


    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable long reservationId) {
        try {
            reservationService.deleteReservation(reservationId);
            return ResponseEntity.noContent().build(); // Retourner 204 No Content si la suppression est réussie
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build(); // Retourner 404 si la réservation n'est pas trouvée
        }
    }

    @DeleteMapping("admin/{reservationId}")
    public ResponseEntity<Void> deleteReservationAdmin(@PathVariable long reservationId) {
        try {
            reservationService.deleteReservation(reservationId);
            return ResponseEntity.noContent().build(); // Retourner 204 No Content si la suppression est réussie
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build(); // Retourner 404 si la réservation n'est pas trouvée
        }
    }


}
