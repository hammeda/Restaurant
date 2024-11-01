package fr.restaurant.reservation_management.services.impl;

import fr.restaurant.reservation_management.dtos.ReservationDto;
import fr.restaurant.reservation_management.dtos.RestaurantTableDto;
import fr.restaurant.reservation_management.dtos.UserDto;
import fr.restaurant.reservation_management.entities.*;
import fr.restaurant.reservation_management.exceptions.ConflictException;
import fr.restaurant.reservation_management.exceptions.NotFoundException;
import fr.restaurant.reservation_management.repositories.ReservationRepository;
import fr.restaurant.reservation_management.repositories.RestaurantTableRepository;
import fr.restaurant.reservation_management.services.IReservationService;
import fr.restaurant.reservation_management.services.IUserService;
import fr.restaurant.reservation_management.tools.DtoTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RestaurantTableRepository tableRepository;

    @Autowired
    private IUserService userService;

    @Override
    public boolean isTableAvailable(long tableId, LocalDate date, LocalTime time) {
        return reservationRepository.countByRestaurantTableIdAndDateAndTime(tableId, date, time) == 0;
    }

    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        // Vérifier la disponibilité de la table
        boolean isAvailable = isTableAvailable(reservationDto.getRestaurantTableId(), reservationDto.getDate(), reservationDto.getTime());
        if (!isAvailable) {
            throw new ConflictException("Table not available"); // Lancez une exception si la table n'est pas disponible
        }

        // Récupérer l'utilisateur à partir de son ID
        UserDto userDto = userService.getById(reservationDto.getUserId());
        if (userDto == null) {
            throw new NotFoundException("User not found"); // Lancez une exception si l'utilisateur n'existe pas
        }

        // Créer la réservation à partir du DTO
        Reservation r = DtoTool.convert(reservationDto, Reservation.class);
        Reservation insertReservation = reservationRepository.saveAndFlush(r);
        return DtoTool.convert(insertReservation, ReservationDto.class);
    }


    @Override
    public List<RestaurantTableDto> getAvailableTables(String date, String time, Localisation localisation, int numberOfPeople) {
        LocalDate reservationDate = LocalDate.parse(date);
        LocalTime reservationTime = LocalTime.parse(time);

        // Obtenez les IDs des tables réservées pour la date et l'heure données
        List<Long> reservedTableIds = reservationRepository.findReservedTableIdsByDateAndTime(reservationDate, reservationTime);
        System.out.println("Reserved Table IDs: " + reservedTableIds); // Debugging

        List<RestaurantTable> availableTables;

        // Vérifiez si la liste des IDs réservés est vide
        if (reservedTableIds.isEmpty()) {
            // Si la liste est vide, retourner toutes les tables de la localisation qui répondent aux critères de nombre de personnes
            availableTables = tableRepository.findByLocalisationAndNumberOfSeatsGreaterThanEqual(localisation, numberOfPeople);
        } else {
            // Sinon, retourner les tables non réservées qui répondent aux critères de nombre de personnes
            availableTables = tableRepository.findByLocalisationAndIdNotInAndNumberOfSeatsGreaterThanEqual(localisation, reservedTableIds, numberOfPeople);
        }

        // Convertir la liste des RestaurantTable en RestaurantTableDto
        return availableTables.stream()
                .map(table -> DtoTool.convert(table, RestaurantTableDto.class)) // Assurez-vous que cette méthode existe
                .toList(); // Utilisez collect(Collectors.toList()) si vous êtes sur une version plus ancienne de Java
    }

    @Override
    public Page<ReservationDto> getListByUserId(long userId, Pageable pageable, String status) {
        Page<Reservation> reservations;

        LocalDate nowDate = LocalDate.now(); // Utiliser LocalDate pour la comparaison
        LocalTime nowTime = LocalTime.now();

        if (status != null) {
            if (status.equals("À venir")) {
                reservations = reservationRepository.findByUserIdAndDateAfterAndTimeAfter(userId, nowDate, nowTime, pageable);
            } else if (status.equals("Passée")) {
                reservations = reservationRepository.findByUserIdAndDateBeforeAndTimeBefore(userId, nowDate, nowTime, pageable);
            } else {
                reservations = reservationRepository.findByUserId(userId, pageable); // Toutes les réservations de l'utilisateur
            }
        } else {
            reservations = reservationRepository.findByUserId(userId, pageable); // Toutes les réservations de l'utilisateur
        }

        // Conversion des réservations en ReservationDto
        return reservations.map(reservation -> {
            ReservationDto dto = DtoTool.convert(reservation, ReservationDto.class);

            // Récupérer l'ID et le nom de la table
            if (reservation.getRestaurantTable() != null) {
                dto.setRestaurantTableId(reservation.getRestaurantTable().getId());
                dto.setTableName(reservation.getRestaurantTable().getName());
                dto.setTablePictureName(reservation.getRestaurantTable().getPictureName());
            }

            return dto;
        });
    }




    @Override
    public void deleteReservation(long reservationId) {
        // Vérifier si la réservation existe
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        // Supprimer la réservation
        reservationRepository.delete(reservation);
    }
    @Override
    public Page<ReservationDto> getAllReservations(Pageable pageable, String status) {
        Page<Reservation> reservations;

        LocalDate nowDate = LocalDate.now(); // Utiliser LocalDate pour la comparaison
        LocalTime nowTime = LocalTime.now();

        if (status != null) {
            if (status.equals("À venir")) {
                reservations = reservationRepository.findByDateAfterAndTimeAfter(nowDate, nowTime, pageable);
            } else if (status.equals("Passée")) {
                reservations = reservationRepository.findByDateBeforeAndTimeBefore(nowDate, nowTime, pageable);
            } else {
                reservations = reservationRepository.findAll(pageable);
            }
        } else {
            reservations = reservationRepository.findAll(pageable);
        }

        // Conversion des réservations en ReservationDto
        return reservations.map(reservation -> {
            ReservationDto dto = DtoTool.convert(reservation, ReservationDto.class);

            // Récupérer l'ID et le nom de la table, si disponible
            if (reservation.getRestaurantTable() != null) {
                dto.setRestaurantTableId(reservation.getRestaurantTable().getId());
                dto.setTableName(reservation.getRestaurantTable().getName());
                dto.setTablePictureName(reservation.getRestaurantTable().getPictureName());
            }

            // Récupérer le nom et le prénom du client
            if (reservation.getUser() != null) {
                dto.setClientPrenom(reservation.getUser().getPrenom());
                dto.setClientNom(reservation.getUser().getNom());
            }

            return dto;
        });
    }




}
