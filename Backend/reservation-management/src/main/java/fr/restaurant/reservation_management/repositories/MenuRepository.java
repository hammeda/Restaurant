package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.Menu;
import fr.restaurant.reservation_management.entities.MenuItemType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByType(MenuItemType type);
}