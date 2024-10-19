package fr.restaurant.reservation_management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Version
    private int version;
    private String email;
    private String password;
    private String prenom;
    private String nom;
    private String telephone;


    @Enumerated(EnumType.STRING) // Utiliser STRING pour stocker le nom de l'énum
    @ElementCollection(targetClass = Role.class)
    private Set<Role> roles = new HashSet<>();

}
