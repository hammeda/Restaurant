// src/components/Admin/UserManagementPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ prenom: '', email: '', nom: '', telephone: '', role: 'CLIENT' });
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // État pour la page actuelle
    const [pageSize] = useState(10); // Nombre d'éléments par page
    const [totalUsers, setTotalUsers] = useState(0); // État pour le nombre total d'utilisateurs
    const token = sessionStorage.getItem('token');

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async (page = currentPage) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/users?page=${page}&size=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Ajouter le token ici
                }
            });
            setUsers(response.data.content); // Les utilisateurs sont dans response.data.content
            setTotalUsers(response.data.totalElements); // Nombre total d'utilisateurs
            console.log("Utilisateurs récupérés :", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Appel à l'API lors du premier chargement du composant
    }, [currentPage]); // Recharger les utilisateurs lorsque la page actuelle change

    // Fonction pour modifier un utilisateur
    const editUser = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setNewUser({ prenom: userToEdit.prenom, email: userToEdit.email, nom: userToEdit.nom, telephone: userToEdit.telephone, role: userToEdit.role });
        setIsEditing(true);
        setEditUserId(id);
    };

    // Fonction pour mettre à jour un utilisateur
    const updateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:9090/api/users/${editUserId}`, newUser, {
                headers: {
                    'Authorization': `Bearer ${token}` // Ajouter le token ici
                }
            });
            setUsers(users.map((user) => (user.id === editUserId ? response.data : user)));
            resetForm();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:9090/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Ajouter le token ici
                }
            });
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    };

    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
        setNewUser({ prenom: '', email: '', nom: '', telephone: '', role: 'CLIENT' });
        setIsEditing(false);
        setEditUserId(null);
    };

    // Fonctions de pagination
    const handleNextPage = () => {
        if ((currentPage + 1) * pageSize < totalUsers) {
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
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion des Utilisateurs</h1>

                {/* Formulaire pour modifier un utilisateur */}
                {isEditing && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Modifier l'Utilisateur</h2>
                        <div className="flex flex-col space-y-4 mb-4">
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                value={newUser.prenom}
                                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <input
                                type="text"
                                placeholder="Nom complet"
                                value={newUser.nom}
                                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <input
                                type="text"
                                placeholder="Numéro de téléphone"
                                value={newUser.telephone}
                                onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            >
                                <option value="CLIENT">Client</option>
                                <option value="ADMIN">Administrateur</option>
                            </select>
                        </div>
                        <button
                            onClick={updateUser}
                            className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                        >
                            Mettre à Jour
                        </button>
                        <button
                            onClick={resetForm}
                            className="py-2 px-4 ml-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                        >
                            Annuler
                        </button>
                    </div>
                )}

                {/* Tableau des utilisateurs */}
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Nom d'utilisateur</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Email</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Nom complet</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Numéro de téléphone</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Rôle</th>
                            <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border border-gray-300">
                                <td className="border border-gray-300 p-2 text-gray-800">{user.prenom}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.nom}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.telephone}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.role}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => editUser(user.id)}
                                        className="py-1 px-2 bg-yellow-600 text-white rounded-md mr-2 hover:bg-yellow-700 transition duration-200"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Contrôles de pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Précédent
                    </button>
                    <span className="text-gray-800">
                        Page {currentPage + 1} sur {Math.ceil(totalUsers / pageSize)}
                    </span>
                    <button onClick={handleNextPage} disabled={(currentPage + 1) * pageSize >= totalUsers} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPage;
