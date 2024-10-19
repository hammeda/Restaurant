package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
