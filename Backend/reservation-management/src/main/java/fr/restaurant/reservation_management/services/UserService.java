package fr.restaurant.reservation_management.services;

import fr.restaurant.reservation_management.dtos.UserDto;
import fr.restaurant.reservation_management.entities.User;
import fr.restaurant.reservation_management.repositories.UserRepository;
import fr.restaurant.reservation_management.tools.DtoTool;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User u = DtoTool.convert(userDto, User.class);
        User insertUser = userRepository.saveAndFlush(u);
        return DtoTool.convert(insertUser, UserDto.class);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> DtoTool.convert(user, UserDto.class)) // Conversion de chaque utilisateur en UserDTO
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getById(long id) {
        Optional<User> u= userRepository.findById(id);
        return DtoTool.convert(u, UserDto.class);
    }

    @Override
    public UserDto updateUser(long id, UserDto userDto) {
        // Recherche de l'utilisateur par son ID
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        // Mettez à jour les propriétés de l'utilisateur existant
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        user.setNom(userDto.getNom());
        user.setTelephone(userDto.getTelephone());
        user.setRoles(userDto.getRoles());

        // Enregistrez les modifications
        User updatedUser = userRepository.save(user); // Ne pas utiliser saveAndFlush ici
        return DtoTool.convert(updatedUser, UserDto.class);
    }


    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}
