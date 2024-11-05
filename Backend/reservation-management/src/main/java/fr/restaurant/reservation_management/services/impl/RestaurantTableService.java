package fr.restaurant.reservation_management.services.impl;

import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.entities.RestaurantTable;
import fr.restaurant.reservation_management.repositories.RestaurantTableRepository;
import fr.restaurant.reservation_management.services.IRestaurantTableService;
import fr.restaurant.reservation_management.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class RestaurantTableService implements IRestaurantTableService {
    @Autowired
    private RestaurantTableRepository restaurantTableRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;

    public RestaurantTableDto createRestaurantTable(RestaurantTableDto restaurantTableDto, MultipartFile file) {
        String pictureName = file.getOriginalFilename();
        restaurantTableDto.setPictureName(pictureName);
        RestaurantTable table = DtoTool.convert(restaurantTableDto, RestaurantTable.class);

        // Gérer le stockage de l'image ici
        if (file != null && !file.isEmpty()) {
            try {
                // Créer le dossier "menu" s'il n'existe pas
                File destinationDir = new File(uploadDir + File.separator + "table");
                if (!destinationDir.exists()) {
                    destinationDir.mkdirs(); // Crée le dossier "menu" s'il n'existe pas
                }

                // Définir le nom et l'emplacement de destination du fichier

                File destinationFile = new File(destinationDir + File.separator + pictureName);

                file.transferTo(destinationFile); // Transférer le fichier
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du stockage de l'image : " + e.getMessage());
            }
        }

        RestaurantTable savedTable = restaurantTableRepository.save(table);
        return DtoTool.convert(savedTable, RestaurantTableDto.class);
    }

    @Override
    public Page<RestaurantTableDto> getAllTables(Pageable pageable) {
        Page<RestaurantTable> tables = restaurantTableRepository.findAll(pageable);
        return tables.map(table -> DtoTool.convert(table, RestaurantTableDto.class));
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

        if (file != null && !file.isEmpty()) {
            try {
                // Créer le dossier "menu" s'il n'existe pas
                File destinationDir = new File(uploadDir + File.separator + "table");
                if (!destinationDir.exists()) {
                    destinationDir.mkdirs(); // Crée le dossier "menu" s'il n'existe pas
                }

                // Suppression de l'ancienne image
                if (existingTable.getPictureName() != null) {
                    File oldFile = new File(destinationDir + File.separator + existingTable.getPictureName());
                    if (oldFile.exists()) {
                        oldFile.delete();
                    }
                }

                // Stocker la nouvelle image
                String pictureName = file.getOriginalFilename();
                existingTable.setPictureName(pictureName);
                File destinationFile = new File(destinationDir + File.separator + pictureName);
                file.transferTo(destinationFile);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du stockage de l'image : " + e.getMessage());
            }
        }

        RestaurantTable updatedTable = restaurantTableRepository.save(existingTable);
        return DtoTool.convert(updatedTable, RestaurantTableDto.class);


    }


    @Override
    public void deleteRestaurantTable(Long id) {
        // Récupérer la table avant de la supprimer pour accéder au nom de l'image
        RestaurantTable existingTable = restaurantTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));

        // Vérifier si une image est associée et la supprimer du stockage
        if (existingTable.getPictureName() != null) {
            File destinationDir = new File(uploadDir + File.separator + "table");
            File oldFile = new File(destinationDir + File.separator + existingTable.getPictureName());

            if (oldFile.exists()) {
                oldFile.delete();
            }
        }

        // Supprimer la table de la base de données
        restaurantTableRepository.deleteById(id);
    }

}
