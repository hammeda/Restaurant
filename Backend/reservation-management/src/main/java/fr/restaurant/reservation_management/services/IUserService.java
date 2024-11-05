package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    UserDto createUser(UserDto userDto);

    Page<UserDto> getAllUsers(Pageable pageable);

    UserDto getById(long id);

    UserDto updateUser(long id, UserDto userDto);

    void deleteUser(long id);
}
