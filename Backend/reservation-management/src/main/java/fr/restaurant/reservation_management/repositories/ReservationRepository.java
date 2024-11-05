package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    long countByRestaurantTableIdAndDateAndTime(Long restaurantTableId, LocalDate date, LocalTime time);

    // Trouver les identifiants des tables déjà réservées à une date et heure données

    @Query("SELECT rt.id FROM Reservation r JOIN r.restaurantTable rt " +
            "WHERE r.date = :date AND r.time = :time")
    List<Long> findReservedTableIdsByDateAndTime(@Param("date") LocalDate date, @Param("time") LocalTime time);


    Page<Reservation> findByUserId(long userId, Pageable pageable);

    @Query("SELECT r FROM Reservation r WHERE r.date > :date OR (r.date = :date AND r.time > :time)")
    Page<Reservation> findByDateAfterAndTimeAfter(@Param("date") LocalDate date, @Param("time") LocalTime time, Pageable pageable);


    @Query("SELECT r FROM Reservation r WHERE r.date < :date OR (r.date = :date AND r.time < :time)")
    Page<Reservation> findByDateBeforeAndTimeBefore(@Param("date") LocalDate date, @Param("time") LocalTime time, Pageable pageable);

    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId AND (r.date > :date OR (r.date = :date AND r.time > :time))")
    Page<Reservation> findByUserIdAndDateAfterAndTimeAfter(@Param("userId") long userId, @Param("date") LocalDate date, @Param("time") LocalTime time, Pageable pageable);

    // Nouvelle méthode pour les réservations passées par utilisateur
    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId AND (r.date < :date OR (r.date = :date AND r.time < :time))")
    Page<Reservation> findByUserIdAndDateBeforeAndTimeBefore(@Param("userId") long userId, @Param("date") LocalDate date, @Param("time") LocalTime time, Pageable pageable);


}
