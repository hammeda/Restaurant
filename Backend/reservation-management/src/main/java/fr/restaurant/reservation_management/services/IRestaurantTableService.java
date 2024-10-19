package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRestaurantTableService {
    RestaurantTableDto createRestaurantTable(RestaurantTableDto restaurantTableDto, MultipartFile file);
    List<RestaurantTableDto> getAllTables();
    RestaurantTableDto getTableById(Long id);
    RestaurantTableDto updateRestaurantTable(Long id, RestaurantTableDto restaurantTableDto, MultipartFile file);
    void deleteRestaurantTable(Long id);
}
