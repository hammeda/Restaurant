// src/components/Admin/UserManagementPage.jsx

import React, { useState } from 'react';

const UserManagementPage = () => {
    // État initial pour les utilisateurs
    const [users, setUsers] = useState([
        { id: 1, username: 'alice', email: 'alice@example.com', name: 'Alice Dupont', phone: '0123456789', role: 'client' },
        { id: 2, username: 'bob', email: 'bob@example.com', name: 'Bob Martin', phone: '0987654321', role: 'administrateur' },
        { id: 3, username: 'charlie', email: 'charlie@example.com', name: 'Charlie Dupuis', phone: '0112233445', role: 'client' },
    ]);

    const [newUser, setNewUser] = useState({ username: '', email: '', name: '', phone: '', role: 'client' });
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    // Fonction pour modifier un utilisateur
    const editUser = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setNewUser({ username: userToEdit.username, email: userToEdit.email, name: userToEdit.name, phone: userToEdit.phone, role: userToEdit.role });
        setIsEditing(true);
        setEditUserId(id);
    };

    // Fonction pour mettre à jour un utilisateur
    const updateUser = () => {
        setUsers(
            users.map((user) =>
                user.id === editUserId ? { ...user, ...newUser } : user
            )
        );
        setNewUser({ username: '', email: '', name: '', phone: '', role: 'client' });
        setIsEditing(false);
        setEditUserId(null);
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
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
                                value={newUser.username}
                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <input
                                type="text"
                                placeholder="Numéro de téléphone"
                                value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="p-2 border rounded-md text-black bg-white"
                            >
                                <option value="client">Client</option>
                                <option value="administrateur">Administrateur</option>
                            </select>
                        </div>
                        <button
                            onClick={updateUser}
                            className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                        >
                            Mettre à Jour
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setNewUser({ username: '', email: '', name: '', phone: '', role: 'client' });
                            }}
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
                                <td className="border border-gray-300 p-2 text-gray-800">{user.username}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.email}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.name}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{user.phone}</td>
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
            </div>
        </div>
    );
};

export default UserManagementPage;
