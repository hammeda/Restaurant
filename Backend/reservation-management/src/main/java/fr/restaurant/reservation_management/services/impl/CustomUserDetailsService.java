package fr.restaurant.reservation_management.services.impl;

import fr.restaurant.reservation_management.dtos.AuthRequest;
import fr.restaurant.reservation_management.dtos.CustomUserDetails;
import fr.restaurant.reservation_management.entities.User;
import fr.restaurant.reservation_management.repositories.UserRepository;
import fr.restaurant.reservation_management.tools.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordService passwordService;

    public String authenticateUser(AuthRequest authRequest) {
        UserDetails userDetails = loadUserByUsername(authRequest.getEmail());

        // Vérifiez si le mot de passe correspond
        if (!passwordService.verifyPassword(authRequest.getPassword(), userDetails.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Récupérez le rôle de l'utilisateur
        String role = userDetails.getAuthorities().stream()  // Utiliser un flux pour récupérer le rôle
                .findFirst()
                .map(GrantedAuthority::getAuthority)  // Récupérer l'autorité
                .orElse("ROLE_CLIENT"); // Valeur par défaut

        // Retourner le token
        return jwtUtils.generateToken(userDetails.getUsername(), ((CustomUserDetails) userDetails).getUserId(), role);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Créer le rôle comme une seule instance de GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name());

        // Retourner l'objet CustomUserDetails construit à partir de l'utilisateur récupéré
        return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getId(), authority);
    }
}
