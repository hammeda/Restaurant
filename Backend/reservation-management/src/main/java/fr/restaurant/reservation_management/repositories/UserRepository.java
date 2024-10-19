package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
