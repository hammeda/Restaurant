package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IRestaurantTableService {
    RestaurantTableDto createRestaurantTable(RestaurantTableDto restaurantTableDto, MultipartFile file);

    Page<RestaurantTableDto> getAllTables(Pageable pageable);

    RestaurantTableDto getTableById(Long id);

    RestaurantTableDto updateRestaurantTable(Long id, RestaurantTableDto restaurantTableDto, MultipartFile file);

    void deleteRestaurantTable(Long id);
}
