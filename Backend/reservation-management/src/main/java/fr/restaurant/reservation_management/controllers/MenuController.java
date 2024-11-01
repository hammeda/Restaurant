package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.MenuDto;
import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.MenuItemType;
import fr.restaurant.reservation_management.services.IMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<MenuDto>> getAllMenus(
            @RequestParam(defaultValue = "0") int page,       // Page par défaut = 0
            @RequestParam(defaultValue = "10") int size) {    // Taille par défaut = 10

        Pageable pageable = PageRequest.of(page, size);
        Page<MenuDto> menus = menuService.getAllMenus(pageable); // Passe Pageable au service
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }


    // Endpoint pour obtenir les menus par type
    @GetMapping("/type")
    public ResponseEntity<Page<MenuDto>> getMenusByType(
            @RequestParam MenuItemType type,
            @RequestParam(defaultValue = "0") int page,    // Page par défaut = 0
            @RequestParam(defaultValue = "10") int size) { // Taille par défaut = 10

        // Créez un objet Pageable avec les paramètres reçus
        Pageable pageable = PageRequest.of(page, size);

        // Passez le Pageable au service
        Page<MenuDto> menus = menuService.getMenusByType(type, pageable);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }


    @GetMapping("/admin")
    public ResponseEntity<Page<MenuDto>> getAllMenusAdmin(
            @RequestParam(defaultValue = "0") int page,       // Page par défaut = 0
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MenuDto> menus = menuService.getAllMenus(pageable); // Passe Pageable au service
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    // Endpoint pour obtenir les menus par type
    @GetMapping("/admin/type")
    public ResponseEntity<Page<MenuDto>> getMenusByTypeAdmin(
            @RequestParam MenuItemType type,
            @RequestParam(defaultValue = "0") int page,    // Page par défaut = 0
            @RequestParam(defaultValue = "10") int size) {
        // Créez un objet Pageable avec les paramètres reçus
        Pageable pageable = PageRequest.of(page, size);

        // Passez le Pageable au service
        Page<MenuDto> menus = menuService.getMenusByType(type, pageable);
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
