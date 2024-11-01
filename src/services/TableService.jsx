// src/services/TableService.js

import axios from 'axios';

const API_URL = 'http://localhost:9090/api/tables/admin';
const token = sessionStorage.getItem('token');

const getTables = async (page = 0, size = 10) => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

const createTable = async (tableData) => {
    const formData = new FormData();
    formData.append('name', tableData.name);
    formData.append('numberOfSeats', tableData.numberOfSeats);
    formData.append('localisation', tableData.localisation);
    formData.append('pictureName', tableData.image.name); // Prends le nom du fichier

    // Append the image file
    formData.append('file', tableData.image); // Ajoute le fichier image

    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

const updateTable = async (id, tableData) => {
    const formData = new FormData();
    formData.append('name', tableData.name);
    formData.append('numberOfSeats', tableData.numberOfSeats);
    formData.append('localisation', tableData.localisation);

    // Vérifiez si une nouvelle image est présente pour la mise à jour
    if (tableData.image) {
        formData.append('file', tableData.image);
        formData.append('pictureName', tableData.image.name); // Ajoutez le nom du fichier
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

const deleteTable = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
};

export default {
    getTables,
    createTable,
    updateTable,
    deleteTable,
};
