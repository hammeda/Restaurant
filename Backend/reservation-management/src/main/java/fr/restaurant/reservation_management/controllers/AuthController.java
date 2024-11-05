package fr.restaurant.reservation_management.controllers;

import fr.restaurant.reservation_management.dtos.AuthRequest;
import fr.restaurant.reservation_management.services.impl.CustomUserDetailsService;
import fr.restaurant.reservation_management.tools.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;


    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // Utilisez la méthode de service pour l'authentification
            String token = customUserDetailsService.authenticateUser(authRequest);
            return ResponseEntity.ok().body(Map.of("token", token));  // Retourner le token dans le corps de la réponse
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));  // Gérer les erreurs d'authentification
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && !token.isEmpty()) {
            blacklistedTokens.add(token); // Ajoute le token à la liste noire
        }
        return ResponseEntity.ok().body("Déconnexion réussie.");
    }

}

