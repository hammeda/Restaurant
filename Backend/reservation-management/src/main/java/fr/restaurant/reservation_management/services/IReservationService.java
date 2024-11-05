package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.ReservationDto;
import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.Localisation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface IReservationService {
    boolean isTableAvailable(long tableId, LocalDate date, LocalTime time);

    ReservationDto createReservation(ReservationDto reservationDto);

    List<RestaurantTableDto> getAvailableTables(String date, String time, Localisation localisation, int numberOfPeople);


    Page<ReservationDto> getListByUserId(long userId, Pageable pageable, String status);

    void deleteReservation(long reservationId);

    Page<ReservationDto> getAllReservations(Pageable pageable, String status);
}
