package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.Localisation;
import fr.restaurant.reservation_management.entities.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    // Trouver les tables par localisation et non présentes dans la liste des réservées
    List<RestaurantTable> findByLocalisationAndIdNotInAndNumberOfSeatsGreaterThanEqual(Localisation localisation, List<Long> reservedTableIds, int numberOfSeats);

    List<RestaurantTable> findByLocalisationAndNumberOfSeatsGreaterThanEqual(Localisation localisation, int numberOfSeats);

}