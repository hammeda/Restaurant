package fr.restaurant.reservation_management.dtos;

import fr.restaurant.reservation_management.entities.Localisation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantTableDto {
    private Long id;
    private int version;
    private String name;
    private int numberOfSeats;
    private Localisation localisation;
    private String pictureName;
}
