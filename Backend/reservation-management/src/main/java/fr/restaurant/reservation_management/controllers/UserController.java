package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.UserDto;
import fr.restaurant.reservation_management.exceptions.NotFoundException;
import fr.restaurant.reservation_management.services.IUserService;
import fr.restaurant.reservation_management.tools.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDTO) {
        UserDto createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(201).body(createdUser);
    }

    //    @GetMapping
//    public ResponseEntity<List<UserDto>> getAllUsers() {
//        List<UserDto> users = userService.getAllUsers();
//        return ResponseEntity.ok(users);
//    }
    @GetMapping
    public ResponseEntity<Page<UserDto>> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        Page<UserDto> users = userService.getAllUsers(PageRequest.of(page, size));
        return ResponseEntity.ok(users);
    }

    // Endpoint pour récupérer un utilisateur par ID
//    @GetMapping("/{id}")
//    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
//        return userService.getById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }

    // Endpoint pour mettre à jour un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDTO) {
        UserDto updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // Endpoint pour supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        // Vérifier si l'en-tête Authorization est présent
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(null); // Retourner 401 Unauthorized si l'en-tête est manquant ou mal formé
        }

        // Extraire le token à partir de l'en-tête Authorization
        String token = authorizationHeader.substring(7); // Supprimer le préfixe "Bearer "

        // Récupérer l'ID à partir du token
        Long userId = jwtUtils.getUserIdFromToken(token);

        UserDto user = userService.getById(userId);

        // Vérifier si l'utilisateur existe et renvoyer la réponse appropriée
        if (user != null) {
            return ResponseEntity.ok(user); // Retourne l'utilisateur si trouvé
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si non trouvé
        }
    }


    // Endpoint pour mettre à jour l'utilisateur connecté par ID
    @PutMapping("/me")
    public ResponseEntity<UserDto> updateCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @Valid @RequestBody UserDto userDTO) {

        // Vérifier si l'en-tête Authorization est présent
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(null); // Retourner 401 Unauthorized si l'en-tête est manquant ou mal formé
        }

        // Extraire le token à partir de l'en-tête Authorization
        String token = authorizationHeader.substring(7); // Supprimer le préfixe "Bearer "

        // Récupérer l'ID à partir du token
        Long userId = jwtUtils.getUserIdFromToken(token); // Récupérer l'ID de l'utilisateur

        try {
            UserDto updatedUserDto = userService.updateUser(userId, userDTO); // Mettre à jour l'utilisateur
            return ResponseEntity.ok(updatedUserDto); // Retourner 200 OK avec l'utilisateur mis à jour
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build(); // Retourner 404 si l'utilisateur n'est pas trouvé
        } catch (Exception e) {
            // Log l'erreur pour le débogage
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retourner 500 si une erreur interne se produit
        }
    }


    // Endpoint pour supprimer l'utilisateur connecté par ID
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser(Principal principal) {
        String token = ((UsernamePasswordAuthenticationToken) principal).getCredentials().toString();
        Long userId = jwtUtils.getUserIdFromToken(token); // Récupérer l'ID de l'utilisateur
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }


}
