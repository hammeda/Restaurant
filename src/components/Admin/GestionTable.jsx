// src/components/Admin/TableManagementPage.jsx

import React, { useState } from 'react';

const TableManagementPage = () => {
    // État initial pour les tables avec les chemins d'image
    const [tables, setTables] = useState([
        { id: 1, name: 'Table 1', seats: 4, location: 'Près de la fenêtre', image: 'src/resources/images/table-romance.jpg' },
        { id: 2, name: 'Table 2', seats: 2, location: 'À l\'extérieur', image: 'src/resources/images/table-famille.jpg' },
        { id: 3, name: 'Table 3', seats: 6, location: 'Salle principale', image: 'src/resources/images/table-terrasse.jpg' },
    ]);

    const [newTable, setNewTable] = useState({ name: '', seats: '', location: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editTableId, setEditTableId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    // Fonction pour ajouter une table
    const addTable = () => {
        if (newTable.name && newTable.seats && newTable.location && newTable.image) {
            setTables([...tables, { id: Date.now(), ...newTable }]);
            setNewTable({ name: '', seats: '', location: '', image: '' });
            setImagePreview('');
        }
    };

    // Fonction pour modifier une table
    const editTable = (id) => {
        const tableToEdit = tables.find((table) => table.id === id);
        setNewTable({ name: tableToEdit.name, seats: tableToEdit.seats, location: tableToEdit.location, image: tableToEdit.image });
        setImagePreview(tableToEdit.image); // Set the image preview for editing
        setIsEditing(true);
        setEditTableId(id);
    };

    // Fonction pour mettre à jour une table
    const updateTable = () => {
        setTables(
            tables.map((table) =>
                table.id === editTableId ? { ...table, ...newTable } : table
            )
        );
        setNewTable({ name: '', seats: '', location: '', image: '' });
        setImagePreview('');
        setIsEditing(false);
        setEditTableId(null);
    };

    // Fonction pour supprimer une table
    const deleteTable = (id) => {
        setTables(tables.filter((table) => table.id !== id));
    };

    // Fonction pour gérer le changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewTable({ ...newTable, image: file });
            setImagePreview(imageUrl); // Set the preview image
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion des Tables</h1>

                {/* Formulaire pour ajouter ou modifier une table */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">{isEditing ? 'Modifier la Table' : 'Ajouter une Nouvelle Table'}</h2>
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Nom de la table"
                            value={newTable.name}
                            onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                            className="flex-grow p-2 border rounded-md text-black bg-white"
                        />
                        <input
                            type="number"
                            placeholder="Nombre de places"
                            value={newTable.seats}
                            onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })}
                            className="flex-grow p-2 border rounded-md text-black bg-white"
                        />
                        <input
                            type="text"
                            placeholder="Emplacement"
                            value={newTable.location}
                            onChange={(e) => setNewTable({ ...newTable, location: e.target.value })}
                            className="flex-grow p-2 border rounded-md text-black bg-white"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="flex-grow p-2 border rounded-md bg-white"
                        />
                    </div>
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Aperçu" className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    )}
                    <button
                        onClick={isEditing ? updateTable : addTable}
                        className={`py-2 px-4 ${isEditing ? 'bg-yellow-600' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 transition duration-200`}
                    >
                        {isEditing ? 'Mettre à Jour' : 'Ajouter'}
                    </button>
                    {isEditing && (
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setNewTable({ name: '', seats: '', location: '', image: '' });
                                setImagePreview('');
                            }}
                            className="py-2 px-4 ml-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                        >
                            Annuler
                        </button>
                    )}
                </div>

                {/* Tableau des tables */}
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Image</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Nom</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Places</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Emplacement</th>
                            <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table) => (
                            <tr key={table.id} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <img src={table.image} alt={table.name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.name}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.seats}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.location}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => editTable(table.id)}
                                        className="py-1 px-2 bg-yellow-600 text-white rounded-md mr-2 hover:bg-yellow-700 transition duration-200"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteTable(table.id)}
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

export default TableManagementPage;
