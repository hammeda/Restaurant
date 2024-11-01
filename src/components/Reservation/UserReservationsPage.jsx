import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState('À venir'); // État pour le filtre
    const [currentPage, setCurrentPage] = useState(0); // État pour la page actuelle
    const [pageSize] = useState(2); // Taille de la page
    const [totalReservations, setTotalReservations] = useState(0); // Total des réservations

    // Configuration d'axios
    const api = axios.create({
        baseURL: 'http://localhost:9090/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Intercepteur pour ajouter le token JWT aux en-têtes des requêtes
    api.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Fonction pour récupérer les réservations de l'utilisateur
    const fetchReservations = async () => {
        try {
            // Récupérer l'ID de l'utilisateur
            const userResponse = await api.get('/users/me');
            const userId = userResponse.data.id;

            // Récupérer les réservations avec pagination et filtre
            const response = await api.get(`/reservations/user/${userId}?page=${currentPage}&size=${pageSize}&status=${filter}`);
            setReservations(response.data.content); // Mettre à jour l'état avec les réservations
            setTotalReservations(response.data.totalElements); // Mettre à jour le total des réservations
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations(); // Appel initial pour récupérer les réservations
    }, [currentPage, filter]); // Dépendances pour la mise à jour

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
            return;
        }

        try {
            await api.delete(`/reservations/${bookingId}`);
            setReservations((prevReservations) =>
                prevReservations.filter((booking) => booking.id !== bookingId)
            );
            alert('Réservation annulée avec succès');
            // Mettre à jour le total des réservations
            setTotalReservations((prevTotal) => prevTotal - 1);
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation:", error);
            alert("Une erreur s'est produite lors de l'annulation de la réservation.");
        }
    };

    const getReservationStatus = (booking) => {
        const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
        const now = new Date();

        return bookingDateTime < now ? 'Passée' : 'À venir';
    };

    // Filtrer les réservations en fonction de leur statut
    const upcomingReservations = reservations.filter((booking) => getReservationStatus(booking) === 'À venir');
    const pastReservations = reservations.filter((booking) => getReservationStatus(booking) === 'Passée');

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
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'url(src/resources/images/restaurant-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.6
                }}
            ></div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative z-10">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Historique des Réservations</h1>

                <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => {
                            setFilter('À venir');
                            setCurrentPage(0); // Réinitialiser à la première page
                        }}
                        className={`py-2 px-4 mr-2 ${filter === 'À venir' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
                    >
                        Réservations à venir
                    </button>
                    <button
                        onClick={() => {
                            setFilter('Passée');
                            setCurrentPage(0); // Réinitialiser à la première page
                        }}
                        className={`py-2 px-4 ${filter === 'Passée' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
                    >
                        Réservations passées
                    </button>
                </div>

                {filter === 'À venir' && upcomingReservations.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Réservations à venir</h2>
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Date</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Heure</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Nombre de personnes</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Table</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Statut</th>
                                    <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingReservations.map((booking) => (
                                    <tr key={booking.id} className="bg-gray-100 hover:bg-gray-200 transition duration-200">
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.date}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.time}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.numberOfPeople}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">
                                            {booking.tableName}
                                            <img
                                                src={`http://localhost:9090/images/table/${booking.tablePictureName}`}
                                                alt={`Image de la table ${booking.tableName}`}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{getReservationStatus(booking)}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <button onClick={() => handleCancelBooking(booking.id)} className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                                                Annuler
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filter === 'Passée' && pastReservations.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Réservations passées</h2>
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Date</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Heure</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Nombre de personnes</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Table</th>
                                    <th className="border border-gray-300 p-2 text-left text-gray-800">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastReservations.map((booking) => (
                                    <tr key={booking.id} className="bg-gray-100 hover:bg-gray-200 transition duration-200">
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.date}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.time}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{booking.numberOfPeople}</td>
                                        <td className="border border-gray-300 p-2 text-gray-800">
                                            {booking.tableName}
                                            <img
                                                src={`http://localhost:9090/images/table/${booking.tablePictureName}`} // Utilisez l'URL de l'image ici
                                                alt={`Image de la table ${booking.tableName}`}
                                                className="w-16 h-16 object-cover" // Ajustez la taille selon vos besoins
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-gray-800">{getReservationStatus(booking)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className={`py-2 px-4 bg-gray-200 text-gray-800 rounded-md ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                    >
                        Précédent
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={(currentPage + 1) * pageSize >= totalReservations}
                        className={`py-2 px-4 bg-gray-200 text-gray-800 rounded-md ${((currentPage + 1) * pageSize) >= totalReservations ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserReservationsPage;
