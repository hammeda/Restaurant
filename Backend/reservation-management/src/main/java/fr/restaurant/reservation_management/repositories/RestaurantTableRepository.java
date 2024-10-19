package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    // Autres méthodes personnalisées si nécessaire
}