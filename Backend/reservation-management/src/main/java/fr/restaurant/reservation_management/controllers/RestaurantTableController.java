package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.Localisation;
import fr.restaurant.reservation_management.services.IRestaurantTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class RestaurantTableController {

    @Autowired
    private IRestaurantTableService restaurantTableService;

    @PostMapping
    public ResponseEntity<RestaurantTableDto> createTable(
            @ModelAttribute RestaurantTableDto restaurantTableDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        // Appeler la méthode du service pour créer la table, incluant la gestion de l'image
        RestaurantTableDto createdTable = restaurantTableService.createRestaurantTable(restaurantTableDto, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTable);
    }

    @GetMapping
    public ResponseEntity<List<RestaurantTableDto>> getAllTables() {
        List<RestaurantTableDto> tables = restaurantTableService.getAllTables();
        return ResponseEntity.ok(tables);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTableDto> getTableById(@PathVariable Long id) {
        RestaurantTableDto tableDto = restaurantTableService.getTableById(id);
        return ResponseEntity.ok(tableDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTableDto> updateTable(
            @PathVariable Long id,
            @ModelAttribute RestaurantTableDto restaurantTableDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        // Appel au service pour mettre à jour la table
        RestaurantTableDto updatedTable = restaurantTableService.updateRestaurantTable(id, restaurantTableDto, file);
        return ResponseEntity.ok(updatedTable);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        restaurantTableService.deleteRestaurantTable(id);
        return ResponseEntity.noContent().build();
    }

}
