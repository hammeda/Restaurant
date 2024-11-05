package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.MenuDto;
import fr.restaurant.reservation_management.entities.MenuItemType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IMenuService {
    Page<MenuDto> getAllMenus(Pageable pageable);

    Page<MenuDto> getMenusByType(MenuItemType type, Pageable pageable);

    MenuDto saveMenu(MenuDto menuDto, MultipartFile file);

    MenuDto updateMenu(Long id, MenuDto menuDto, MultipartFile file);

    void deleteMenu(long id);
}
