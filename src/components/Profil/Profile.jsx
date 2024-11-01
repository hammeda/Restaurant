// src/components/UserProfile/UserProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
    });

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

    useEffect(() => {
        // Récupérer les données de l'utilisateur depuis le back-end
        api.get('/users/me')
            .then((response) => {
                setUser(response.data);
                setEditFormData(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            });
    }, []);

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
        // Mettre à jour les informations de l'utilisateur via le back-end
        api.put('/users/me', editFormData)
            .then((response) => {
                setUser(response.data);
                setIsEditing(false);
                alert('Informations mises à jour avec succès');
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
            });
    };

    const handleCancelEdit = () => {
        setEditFormData({ ...user });
        setIsEditing(false);
    };

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Profil Utilisateur</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations Personnelles</h2>
                    {isEditing ? (
                        <div className="space-y-4">
                            {/* Champs de formulaire pour l'édition des informations personnelles */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={editFormData.prenom}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={editFormData.nom}
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
                                    name="telephone"
                                    value={editFormData.telephone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800"
                                />
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button onClick={handleSaveChanges} className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                                    Sauvegarder
                                </button>
                                <button onClick={handleCancelEdit} className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Affichage des informations de l'utilisateur */}
                            <p className="text-gray-700"><strong>Prénom :</strong> {user.prenom}</p>
                            <p className="text-gray-700"><strong>Nom :</strong> {user.nom}</p>
                            <p className="text-gray-700"><strong>Adresse e-mail :</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>Numéro de téléphone :</strong> {user.telephone}</p>
                            <button onClick={handleEditToggle} className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                Modifier les Informations
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
