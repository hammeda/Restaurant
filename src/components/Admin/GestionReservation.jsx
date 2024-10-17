// src/components/Admin/ReservationManagementPage.jsx

import React, { useState } from 'react';

const ReservationManagementPage = () => {
    // État initial pour les réservations
    const [reservations, setReservations] = useState([
        {
            id: 1,
            date: '2024-10-20',
            time: '19:00',
            numberOfPeople: 4,
            table: 'Table 1',
            status: 'À venir',
            customer: 'Jean Dupont',
        },
        {
            id: 2,
            date: '2024-09-15',
            time: '20:00',
            numberOfPeople: 2,
            table: 'Table 2',
            status: 'Passée',
            customer: 'Marie Durand',
        },
        {
            id: 3,
            date: '2024-11-05',
            time: '18:00',
            numberOfPeople: 6,
            table: 'Table 3',
            status: 'À venir',
            customer: 'Pierre Martin',
        },
    ]);
    const [filter, setFilter] = useState('À venir');

    // Fonction pour annuler une réservation
    const cancelReservation = (id) => {
        setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
                reservation.id === id ? { ...reservation, status: 'Annulée' } : reservation
            )
        );
    };

    // Fonction pour filtrer les réservations
    const filterReservations = (status) => {
        setFilter(status);
    };

    // Fonction pour obtenir les réservations filtrées
    const getFilteredReservations = () => {
        if (filter === 'Tous') {
            return reservations;
        }
        return reservations.filter((reservation) => reservation.status === filter);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion des Réservations</h1>

                {/* Filtres pour trier les réservations */}
                <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => filterReservations('À venir')}
                        className={`py-2 px-4 mr-2 ${filter === 'À venir' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
                    >
                        Réservations à venir
                    </button>
                    <button
                        onClick={() => filterReservations('Passée')}
                        className={`py-2 px-4 ${filter === 'Passée' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
                    >
                        Réservations passées
                    </button>
                </div>

                {/* Tableau des réservations */}
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Date</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Heure</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Personnes</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Table</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Client</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Statut</th>
                            {/* Afficher la colonne "Actions" uniquement pour les réservations à venir */}
                            {filter === 'À venir' && (
                                <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredReservations().map((reservation) => (
                            <tr key={reservation.id} className="border border-gray-300">
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.date}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.time}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.numberOfPeople}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.table}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.customer}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.status}</td>
                                {/* Afficher le bouton "Annuler" uniquement pour les réservations à venir */}
                                {filter === 'À venir' && (
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            onClick={() => cancelReservation(reservation.id)}
                                            className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                                        >
                                            Annuler
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationManagementPage;
