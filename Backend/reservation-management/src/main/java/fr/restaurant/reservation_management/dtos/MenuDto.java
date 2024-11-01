package fr.restaurant.reservation_management.dtos;

import fr.restaurant.reservation_management.entities.MenuItemType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuDto {
    private long id;
    private int version;
    @NotEmpty(message = "Le nom ne peut pas être vide")
    private String name;
    private String description;
    @Positive(message = "Le prix doit être positif")
    private double price;
    private String pictureName;
    private List<String> ingredients;
    private MenuItemType type;
}
