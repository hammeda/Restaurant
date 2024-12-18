package fr.restaurant.reservation_management.services.impl;

import fr.restaurant.reservation_management.dtos.MenuDto;
import fr.restaurant.reservation_management.entities.Menu;
import fr.restaurant.reservation_management.entities.MenuItemType;
import fr.restaurant.reservation_management.repositories.MenuRepository;
import fr.restaurant.reservation_management.services.IMenuService;
import fr.restaurant.reservation_management.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class MenuService implements IMenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;


    @Override
    public Page<MenuDto> getAllMenus(Pageable pageable) {
        return menuRepository.findAll(pageable)
                .map(menu -> DtoTool.convert(menu, MenuDto.class)); // Utilise .map() pour convertir
    }

    // Récupère les menus par type et les convertit en DTO
    @Override
    public Page<MenuDto> getMenusByType(MenuItemType type, Pageable pageable) {
        return menuRepository.findByType(type, pageable)
                .map(menu -> DtoTool.convert(menu, MenuDto.class));
    }

    @Override
    public MenuDto saveMenu(MenuDto menuDto, MultipartFile file) {
        String pictureName = file.getOriginalFilename();
        menuDto.setPictureName(pictureName);
        Menu menu = DtoTool.convert(menuDto, Menu.class);

        // Gérer le stockage de l'image ici
        if (file != null && !file.isEmpty()) {
            try {
                // Créer le dossier "menu" s'il n'existe pas
                File destinationDir = new File(uploadDir + File.separator + "menu");
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

        Menu savedMenu = menuRepository.save(menu);
        return DtoTool.convert(savedMenu, MenuDto.class);
    }


    @Override
    public MenuDto updateMenu(Long id, MenuDto menuDto, MultipartFile file) {
        Menu existingMenu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));

        existingMenu.setName(menuDto.getName());
        existingMenu.setDescription(menuDto.getDescription());
        existingMenu.setIngredients(menuDto.getIngredients());
        existingMenu.setPrice(menuDto.getPrice());
        existingMenu.setType(menuDto.getType());

        if (file != null && !file.isEmpty()) {
            try {
                // Créer le dossier "menu" s'il n'existe pas
                File destinationDir = new File(uploadDir + File.separator + "menu");
                if (!destinationDir.exists()) {
                    destinationDir.mkdirs(); // Crée le dossier "menu" s'il n'existe pas
                }

                // Suppression de l'ancienne image
                if (existingMenu.getPictureName() != null) {
                    File oldFile = new File(destinationDir + File.separator + existingMenu.getPictureName());
                    if (oldFile.exists()) {
                        oldFile.delete();
                    }
                }

                // Stocker la nouvelle image
                String pictureName = file.getOriginalFilename();
                existingMenu.setPictureName(pictureName);
                File destinationFile = new File(destinationDir + File.separator + pictureName);
                file.transferTo(destinationFile);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du stockage de l'image : " + e.getMessage());
            }
        }

        Menu updatedMenu = menuRepository.save(existingMenu);
        return DtoTool.convert(updatedMenu, MenuDto.class);
    }


    @Override
    public void deleteMenu(long id) {
        // Récupérer le menu avant de le supprimer pour obtenir le nom de l'image
        Menu existingMenu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));

        // Vérifier si une image est associée au menu et la supprimer du stockage
        if (existingMenu.getPictureName() != null) {
            File destinationDir = new File(uploadDir + File.separator + "menu");
            File oldFile = new File(destinationDir + File.separator + existingMenu.getPictureName());

            if (oldFile.exists()) {
                oldFile.delete();
            } 
        }

        // Supprimer le menu de la base de données
        menuRepository.deleteById(id);
    }

}
