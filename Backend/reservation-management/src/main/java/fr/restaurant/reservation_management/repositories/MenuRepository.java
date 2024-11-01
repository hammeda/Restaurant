package fr.restaurant.reservation_management.repositories;

import fr.restaurant.reservation_management.entities.Menu;
import fr.restaurant.reservation_management.entities.MenuItemType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MenuRepository extends JpaRepository<Menu, Long> {
    Page<Menu> findByType(MenuItemType type, Pageable pageable);
}