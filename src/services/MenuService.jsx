import axios from 'axios';

const API_URL = 'http://localhost:9090/api/menu'; // Changez l'URL selon votre backend

const MenuService = {
    // Récupère tous les éléments du menu
    async getMenuItems() {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    },

    // Ajoute un nouvel élément de menu
    async createMenuItem(menuItem) {
        const formData = new FormData();
        formData.append('name', menuItem.name);
        formData.append('description', menuItem.description);
        formData.append('price', menuItem.price);
        formData.append('ingredients', menuItem.ingredients);
        formData.append('type', menuItem.type);
        if (menuItem.image) {
            formData.append('image', menuItem.image);
        }
        const response = await axios.post(`${API_URL}/items`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Met à jour un élément du menu
    async updateMenuItem(id, menuItem) {
        const formData = new FormData();
        formData.append('name', menuItem.name);
        formData.append('description', menuItem.description);
        formData.append('price', menuItem.price);
        formData.append('ingredients', menuItem.ingredients);
        formData.append('type', menuItem.type);
        if (menuItem.image) {
            formData.append('image', menuItem.image);
        }
        const response = await axios.put(`${API_URL}/items/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Supprime un élément du menu
    async deleteMenuItem(id) {
        const response = await axios.delete(`${API_URL}/items/${id}`);
        return response.data;
    },
};

export default MenuService;