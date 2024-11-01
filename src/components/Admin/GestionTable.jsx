// src/components/Admin/TableManagementPage.jsx

import React, { useState, useEffect } from 'react';
import TableService from '../../services/TableService';

const TableManagementPage = () => {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ name: '', numberOfSeats: '', localisation: '', image: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editTableId, setEditTableId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [currentPage, setCurrentPage] = useState(0); // État de pagination
    const [pageSize] = useState(5); // Nombre de tables par page
    const [totalTables, setTotalTables] = useState(0); // Nombre total de tables

    useEffect(() => {
        fetchTables(); // Charger les tables lors du montage du composant ou lors du changement de page
    }, [currentPage]);

    const fetchTables = async (page = currentPage) => {
        try {
            const response = await TableService.getTables(page, pageSize);
            setTables(response.content);
            setTotalTables(response.totalElements); // Total des tables depuis l'API
        } catch (error) {
            console.error("Erreur lors de la récupération des tables:", error);
        }
    };

    // Fonction pour ajouter une nouvelle table
    const addTable = async () => {
        if (newTable.name && newTable.numberOfSeats && newTable.localisation && newTable.image) {
            const createdTable = await TableService.createTable(newTable);
            setTables([...tables, createdTable]);
            resetForm();
        }
    };

    const editTable = (id) => {
        const tableToEdit = tables.find((table) => table.id === id);
        setNewTable({
            name: tableToEdit.name,
            numberOfSeats: tableToEdit.numberOfSeats,
            localisation: tableToEdit.localisation,
            image: null,
        });
        setImagePreview(`http://localhost:9090/images/table/${tableToEdit.pictureName}`);
        setIsEditing(true);
        setEditTableId(id);
    };

    const updateTable = async () => {
        await TableService.updateTable(editTableId, newTable);
        setTables(tables.map((table) => (table.id === editTableId ? { ...table, ...newTable } : table)));
        resetForm();
    };

    const resetForm = () => {
        setNewTable({ name: '', numberOfSeats: '', localisation: '', image: null });
        setImagePreview('');
        setIsEditing(false);
        setEditTableId(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewTable({ ...newTable, image: file });
            setImagePreview(imageUrl);
        }
    };

    const deleteTable = async (id) => {
        await TableService.deleteTable(id);
        setTables(tables.filter((table) => table.id !== id));
    };

    // Fonctions de pagination
    const handleNextPage = () => {
        if ((currentPage + 1) * pageSize < totalTables) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion des Tables</h1>

                {/* Formulaire pour Ajouter ou Modifier une Table */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">{isEditing ? 'Modifier la Table' : 'Ajouter une Nouvelle Table'}</h2>
                    <div className="flex space-x-4 mb-4">
                        <input type="text" placeholder="Nom de la table" value={newTable.name} onChange={(e) => setNewTable({ ...newTable, name: e.target.value })} className="flex-grow p-2 border rounded-md text-black bg-white" />
                        <input type="number" placeholder="Nombre de places" value={newTable.numberOfSeats} onChange={(e) => setNewTable({ ...newTable, numberOfSeats: e.target.value })} className="flex-grow p-2 border rounded-md text-black bg-white" />
                        <select value={newTable.localisation} onChange={(e) => setNewTable({ ...newTable, localisation: e.target.value })} className="flex-grow p-2 border rounded-md text-black bg-white">
                            <option value="">Sélectionnez un emplacement</option>
                            <option value="INTERIEUR">Intérieur</option>
                            <option value="EXTERIEUR">Extérieur</option>
                        </select>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="flex-grow p-2 border rounded-md bg-white" />
                    </div>
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Aperçu" className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    )}
                    <button onClick={isEditing ? updateTable : addTable} className={`py-2 px-4 ${isEditing ? 'bg-yellow-600' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 transition duration-200`}>
                        {isEditing ? 'Mettre à Jour' : 'Ajouter'}
                    </button>
                    {isEditing && (
                        <button onClick={resetForm} className="py-2 px-4 ml-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                            Annuler
                        </button>
                    )}
                </div>

                {/* Liste des Tables */}
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
                                    <img src={`http://localhost:9090/images/table/${table.pictureName}`} alt={table.name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.name}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.numberOfSeats}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{table.localisation}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button onClick={() => editTable(table.id)} className="py-1 px-2 bg-yellow-600 text-white rounded-md mr-2 hover:bg-yellow-700 transition duration-200">
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteTable(table.id)} className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Précédent
                    </button>
                    <span className="text-gray-800">
                        Page {currentPage + 1} sur {Math.ceil(totalTables / pageSize)}
                    </span>
                    <button onClick={handleNextPage} disabled={(currentPage + 1) * pageSize >= totalTables} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableManagementPage;
