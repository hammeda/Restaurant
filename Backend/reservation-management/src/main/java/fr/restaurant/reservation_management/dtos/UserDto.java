package fr.restaurant.reservation_management.dtos;

import fr.restaurant.reservation_management.entities.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    @NotEmpty(message = "Le nom ne peut pas être vide")
    private String nom;

    @NotEmpty(message = "Le prenom ne peut pas être vide")
    private String prenom;

    @Email(message = "L'email doit être valide")
    private String email;

    private String telephone;

    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;

    private Set<Role> roles; // Utiliser le DTO pour le rôle

}