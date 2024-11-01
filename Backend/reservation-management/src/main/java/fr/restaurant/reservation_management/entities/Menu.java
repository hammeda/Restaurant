package fr.restaurant.reservation_management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Version
    private int version;
    private String name;
    private String description;
    private double price;
    private String pictureName;
    @ElementCollection
    private List<String> ingredients;
    @Enumerated(EnumType.STRING)
    private MenuItemType type; // Enum pour les types d'articles (entrée, plat, dessert, boisson)

    // Getters et Setters
}

