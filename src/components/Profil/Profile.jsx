// src/components/UserProfile/UserProfilePage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
    const [user, setUser] = useState({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        phoneNumber: '0123456789',
        bookings: [
            {
                id: 1,
                date: '2024-10-20',
                time: '19:00',
                numberOfPeople: 4,
                table: 'Table 1',
                status: 'passée',
            },
            {
                id: 2,
                date: '2024-11-15',
                time: '20:00',
                numberOfPeople: 2,
                table: 'Table 2',
                status: 'future',
            },
        ],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {
        setUser(editFormData);
        setIsEditing(false);
        alert('Informations mises à jour avec succès');
    };

    const handleCancelEdit = () => {
        setEditFormData({ ...user });
        setIsEditing(false);
    };

    const handleCancelBooking = (bookingId) => {
        setUser((prevUser) => ({
            ...prevUser,
            bookings: prevUser.bookings.filter((booking) => booking.id !== bookingId),
        }));
        alert('Réservation annulée avec succès');
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Profil Utilisateur</h1>

                {/* Section des Informations Personnelles */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations Personnelles</h2>
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editFormData.firstName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editFormData.lastName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Adresse e-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Numéro de téléphone</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editFormData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={handleSaveChanges}
                                    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                                >
                                    Sauvegarder
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-700"><strong>Prénom :</strong> {user.firstName}</p>
                            <p className="text-gray-700"><strong>Nom :</strong> {user.lastName}</p>
                            <p className="text-gray-700"><strong>Adresse e-mail :</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>Numéro de téléphone :</strong> {user.phoneNumber}</p>
                            <button
                                onClick={handleEditToggle}
                                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Modifier les Informations
                            </button>
                        </div>
                    )}
                </div>

                {/* Historique des Réservations */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Historique des Réservations</h2>
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 text-left text-gray-800">Date</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-800">Heure</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-800">Personnes</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-800">Table</th>
                                <th className="border border-gray-300 p-2 text-left text-gray-800">Statut</th>
                                <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.bookings.map((booking) => (
                                <tr key={booking.id} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2 text-gray-800">{booking.date}</td>
                                    <td className="border border-gray-300 p-2 text-gray-800">{booking.time}</td>
                                    <td className="border border-gray-300 p-2 text-gray-800">{booking.numberOfPeople}</td>
                                    <td className="border border-gray-300 p-2 text-gray-800">{booking.table}</td>
                                    <td className="border border-gray-300 p-2 text-gray-800">{booking.status}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {booking.status === 'future' && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                                            >
                                                Annuler
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
