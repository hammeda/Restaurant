package fr.restaurant.reservation_management.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Version
    private int version;
    private String name;
    private int numberOfSeats;
    @Enumerated(EnumType.STRING) // Utiliser STRING pour stocker le nom de l'énum
    private Localisation localisation;
    private String pictureName;
}

