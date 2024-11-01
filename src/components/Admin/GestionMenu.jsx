// src/components/Admin/AdminMenuPage.jsx

import React, { useEffect, useState } from 'react';

const AdminMenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const token = sessionStorage.getItem('token');
    const [newMenuItem, setNewMenuItem] = useState({
        name: '',
        description: '',
        price: '',
        ingredients: '',
        type: 'ENTREE',
        image: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [selectedType, setSelectedType] = useState('all'); // État pour le type sélectionné

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:9090/api/menu/admin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des éléments du menu:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenuItem((prev) => ({
            ...prev,
            [name]: value,
            ingredients: name === 'ingredients' ? value.split(',').map(ing => ing.trim()) : prev.ingredients,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewMenuItem({ ...newMenuItem, image: file });
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', newMenuItem.name);
        formData.append('description', newMenuItem.description);
        formData.append('price', newMenuItem.price);
        formData.append('ingredients', newMenuItem.ingredients);
        formData.append('type', newMenuItem.type);
        if (newMenuItem.image) {
            formData.append('file', newMenuItem.image);
        }

        try {
            const url = isEditing ? `http://localhost:9090/api/menu/admin/${editItemId}` : 'http://localhost:9090/api/menu/admin';
            const method = isEditing ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            fetchMenuItems();
            resetForm();
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la mise à jour de l\'élément:', error);
        }
    };

    const editMenuItem = (item) => {
        setNewMenuItem({
            name: item.name,
            description: item.description,
            price: item.price,
            ingredients: item.ingredients.join(', '),
            type: item.type,
            image: null,
        });
        setImagePreview(`http://localhost:9090/images/menu/${item.pictureName}`);
        setIsEditing(true);
        setEditItemId(item.id);
    };

    const deleteMenuItem = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            try {
                await fetch(`http://localhost:9090/api/menu/admin/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                fetchMenuItems();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'élément:', error);
            }
        }
    };

    const resetForm = () => {
        setNewMenuItem({
            name: '',
            description: '',
            price: '',
            ingredients: '',
            type: 'ENTREE',
            image: null,
        });
        setImagePreview('');
        setIsEditing(false);
        setEditItemId(null);
    };

    // Fonction pour filtrer les éléments du menu par type
    const filteredMenuItems = () => {
        return selectedType === 'all'
            ? menuItems
            : menuItems.filter(item => item.type === selectedType);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestion du Menu</h1>

                {/* Sélecteur pour filtrer par type */}
                <div className="mb-4">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="p-2 border rounded-md text-black bg-white shadow"
                    >
                        <option value="all">Tous</option>
                        <option value="ENTREE">Entrées</option>
                        <option value="PLAT">Plats</option>
                        <option value="DESSERT">Desserts</option>
                        <option value="BOISSON">Boissons</option>
                    </select>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">{isEditing ? 'Modifier l\'élément du Menu' : 'Ajouter un Nouvel Élément au Menu'}</h2>
                    <div className="flex space-x-4 mb-4">
                        <input type="text" name="name" placeholder="Nom" value={newMenuItem.name} onChange={handleInputChange} className="flex-grow p-2 border rounded-md text-black bg-white" />
                        <input type="number" name="price" placeholder="Prix" value={newMenuItem.price} onChange={handleInputChange} className="flex-grow p-2 border rounded-md text-black bg-white" />
                        <select name="type" value={newMenuItem.type} onChange={handleInputChange} className="flex-grow p-2 border rounded-md text-black bg-white">
                            <option value="ENTREE">Entrée</option>
                            <option value="PLAT">Plat</option>
                            <option value="DESSERT">Dessert</option>
                            <option value="BOISSON">Boisson</option>
                        </select>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="flex-grow p-2 border rounded-md bg-white" />
                    </div>
                    <textarea name="description" placeholder="Description" value={newMenuItem.description} onChange={handleInputChange} className="p-2 border rounded-md text-black bg-white w-full mb-2"></textarea>
                    <input type="text" name="ingredients" placeholder="Ingrédients (séparés par des virgules)" value={newMenuItem.ingredients} onChange={handleInputChange} className="p-2 border rounded-md text-black bg-white w-full mb-4" />
                    {imagePreview && <img src={imagePreview} alt="Aperçu" className="w-32 h-32 object-cover rounded-md mb-4" />}

                    <button onClick={handleSubmit} className={`py-2 px-4 ${isEditing ? 'bg-yellow-600' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 transition duration-200`}>
                        {isEditing ? 'Mettre à Jour' : 'Ajouter'}
                    </button>
                    {isEditing && (
                        <button onClick={resetForm} className="py-2 px-4 ml-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
                            Annuler
                        </button>
                    )}
                </div>

                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Image</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Nom</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Prix</th>
                            <th className="border border-gray-300 p-2 text-left text-gray-800">Type</th>
                            <th className="border border-gray-300 p-2 text-center text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenuItems().map((item) => (
                            <tr key={item.id} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <img src={`http://localhost:9090/images/menu/${item.pictureName}`} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="border border-gray-300 p-2 text-gray-800">{item.name}</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{item.price} €</td>
                                <td className="border border-gray-300 p-2 text-gray-800">{item.type}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button onClick={() => editMenuItem(item)} className="py-1 px-2 bg-yellow-600 text-white rounded-md mr-2 hover:bg-yellow-700 transition duration-200">
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteMenuItem(item.id)} className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
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

export default AdminMenuPage;
