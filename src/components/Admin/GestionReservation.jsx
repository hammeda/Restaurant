import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationManagementPage = () => {
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('À venir'); // Filtre par défaut
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(2);
    const [totalReservations, setTotalReservations] = useState(0);
    const token = sessionStorage.getItem('token');

    const api = axios.create({
        baseURL: 'http://localhost:9090/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const fetchReservations = async () => {
        try {
            const response = await api.get(`/reservations/all?page=${currentPage}&size=${pageSize}&status=${filter}`, { // Passer le filtre ici
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReservations(response.data.content);
            setTotalReservations(response.data.totalElements);
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [currentPage, filter]); // Ajouter 'filter' à la dépendance

    const cancelReservation = async (id) => {
        try {
            await api.delete(`/reservations/admin/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== id)
            );
        } catch (error) {
            console.error('Erreur lors de l\'annulation de la réservation:', error);
        }
    };

    const filterReservations = (status) => {
        setFilter(status);
        setCurrentPage(0); // Réinitialiser la page lors du changement de filtre
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * pageSize < totalReservations) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion des Réservations</h1>

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

                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Date</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Heure</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Personnes</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Table</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Client</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Statut</th>
                            {filter === 'À venir' && (
                                <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id} className="border border-gray-300">
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.date}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.time}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.numberOfPeople}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.tableName} <img
                                    src={`http://localhost:9090/images/table/${reservation.tablePictureName}`}
                                    alt={`Image de la table ${reservation.tableName}`}
                                    className="w-16 h-16 object-cover"
                                /></td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.clientNom + " " + reservation.clientPrenom}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{reservation.statuts}</td>
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

                <div className="flex justify-between items-center mt-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Précédent
                    </button>
                    <span className="text-gray-800">
                        Page {currentPage + 1} sur {Math.ceil(totalReservations / pageSize)}
                    </span>
                    <button onClick={handleNextPage} disabled={(currentPage + 1) * pageSize >= totalReservations} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationManagementPage;
