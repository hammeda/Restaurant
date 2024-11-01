package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.MenuDto;
import fr.restaurant.reservation_management.entities.MenuItemType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IMenuService {
    List<MenuDto> getAllMenus();
    List<MenuDto> getMenusByType(MenuItemType type);
    MenuDto saveMenu(MenuDto menuDto, MultipartFile file);
    MenuDto updateMenu(Long id, MenuDto menuDto, MultipartFile file);
    void deleteMenu(long id);
}
