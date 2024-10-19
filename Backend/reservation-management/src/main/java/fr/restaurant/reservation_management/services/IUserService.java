package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.UserDto;

import java.util.List;

public interface IUserService {
    UserDto createUser(UserDto userDto);
    List<UserDto> getAllUsers();
    UserDto getById(long id);
    UserDto updateUser(long id, UserDto userDto);
    void deleteUser(long id);
}
