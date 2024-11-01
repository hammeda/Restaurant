package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.MenuDto;
import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.MenuItemType;
import fr.restaurant.reservation_management.services.IMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/menu") // Ajustez si nécessaire pour le frontend
public class MenuController {

    @Autowired
    private IMenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuDto>> getAllMenus() {
        List<MenuDto> menus = menuService.getAllMenus();
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    // Endpoint pour obtenir les menus par type
    @GetMapping("/type")
    public ResponseEntity<List<MenuDto>> getMenusByType(@RequestParam MenuItemType type) {
        List<MenuDto> menus = menuService.getMenusByType(type);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<MenuDto>> getAllMenusAdmin() {
        List<MenuDto> menus = menuService.getAllMenus();
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    // Endpoint pour obtenir les menus par type
    @GetMapping("/admin/type")
    public ResponseEntity<List<MenuDto>> getMenusByTypeAdmin(@RequestParam MenuItemType type) {
        List<MenuDto> menus = menuService.getMenusByType(type);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<MenuDto> createTable(
            @ModelAttribute MenuDto menuDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        // Appeler la méthode du service pour créer la table, incluant la gestion de l'image
        MenuDto createdMenu = menuService.saveMenu(menuDto, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMenu);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<MenuDto> updateMenu(
            @PathVariable Long id,
            @ModelAttribute MenuDto menuDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        // Appel au service pour mettre à jour la table
        MenuDto updatedMenu = menuService.updateMenu(id, menuDto, file);
        return ResponseEntity.ok(updatedMenu);
    }

    // Endpoint pour supprimer un menu
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
