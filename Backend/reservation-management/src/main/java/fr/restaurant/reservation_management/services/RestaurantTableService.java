package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.dtos.UserDto;
import fr.restaurant.reservation_management.entities.RestaurantTable;
import fr.restaurant.reservation_management.entities.User;
import fr.restaurant.reservation_management.repositories.RestaurantTableRepository;
import fr.restaurant.reservation_management.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantTableService implements IRestaurantTableService{
    @Autowired
    private RestaurantTableRepository restaurantTableRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;

    public RestaurantTableDto createRestaurantTable(RestaurantTableDto restaurantTableDto, MultipartFile file) {
        RestaurantTable restaurantTable = DtoTool.convert(restaurantTableDto, RestaurantTable.class);

        if (file == null) {
            System.out.println("Le fichier est null");
        } else if (file.isEmpty()) {
            System.out.println("Le fichier est vide");
        } else {
            System.out.println("Le fichier est présent et non vide");
        }

        // Gérer le stockage de l'image ici
        if (file != null && !file.isEmpty()) {
            // Gérer le stockage de l'image
            try {
                String pictureName = file.getOriginalFilename(); // Obtenir le nom du fichier
                restaurantTableDto.setPictureName(pictureName); // Assigner le nom du fichier au DTO

                // Stocker le fichier à l'emplacement souhaité
                File destinationFile = new File(uploadDir + File.separator + pictureName);
                System.out.println("Saving file to: " + destinationFile.getAbsolutePath());

                file.transferTo(destinationFile); // Transférer le fichier
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du stockage de l'image : " + e.getMessage());
            }
        }

        // Sauvegarder la table après avoir géré le fichier
        RestaurantTable savedTable = restaurantTableRepository.save(restaurantTable);
        return DtoTool.convert(savedTable, RestaurantTableDto.class);
    }

    @Override
    public List<RestaurantTableDto> getAllTables() {
        List<RestaurantTable> tables = restaurantTableRepository.findAll();
        return tables.stream()
                .map(table -> DtoTool.convert(table, RestaurantTableDto.class))
                .toList();
    }

    @Override
    public RestaurantTableDto getTableById(Long id) {
        Optional<RestaurantTable> tableOpt = restaurantTableRepository.findById(id);
        if (tableOpt.isPresent()) {
            return DtoTool.convert(tableOpt.get(), RestaurantTableDto.class);
        } else {
            throw new RuntimeException("Table not found with id: " + id);
        }
    }

    @Override
    public RestaurantTableDto updateRestaurantTable(Long id, RestaurantTableDto restaurantTableDto, MultipartFile file) {
        RestaurantTable existingTable = restaurantTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));

        // Mettre à jour les propriétés de l'objet existant
        existingTable.setName(restaurantTableDto.getName());
        existingTable.setNumberOfSeats(restaurantTableDto.getNumberOfSeats());
        existingTable.setLocalisation(restaurantTableDto.getLocalisation());

        // Gestion de l'image : si un nouveau fichier est fourni
        if (file != null && !file.isEmpty()) {
            try {
                // Suppression de l'ancienne image si nécessaire (facultatif)
                if (existingTable.getPictureName() != null) {
                    File oldFile = new File(uploadDir + File.separator + existingTable.getPictureName());
                    if (oldFile.exists()) {
                        oldFile.delete(); // Supprimez l'ancien fichier, si nécessaire
                    }
                }

                // Gérer le stockage de la nouvelle image
                String pictureName = file.getOriginalFilename(); // Obtenir le nom du fichier
                existingTable.setPictureName(pictureName); // Assigner le nom du fichier à l'objet existant

                // Stocker le fichier à l'emplacement souhaité
                File destinationFile = new File(uploadDir + File.separator + pictureName);
                file.transferTo(destinationFile); // Transférer le fichier
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du stockage de l'image : " + e.getMessage());
            }
        }

        // Sauvegarder la table après avoir géré le fichier
        RestaurantTable updatedTable = restaurantTableRepository.save(existingTable);
        return DtoTool.convert(updatedTable, RestaurantTableDto.class);
    }


    @Override
    public void deleteRestaurantTable(Long id) {
        restaurantTableRepository.deleteById(id);
    }
}
