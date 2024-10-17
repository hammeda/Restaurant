// src/components/MenuPage.jsx

import React, { useState } from 'react';

// Chemin d'accès aux images (ajustez selon votre structure de fichiers)
const imagePath = 'src/resources/images/menu/';

const MenuPage = () => {
    // État initial pour les plats et boissons
    const [menuItems] = useState([
        { id: 1, name: 'Salade César', category: 'entrées', description: 'Une salade fraîche avec poulet grillé, croûtons et parmesan.', price: 8.99, ingredients: ['Laitue', 'Poulet', 'Parmesan', 'Croûtons', 'Sauce César'], image: `${imagePath}salad.jpg` },
        { id: 2, name: 'Pasta Alfredo', category: 'plats', description: 'Pâtes crémeuses avec sauce Alfredo et parmesan.', price: 12.99, ingredients: ['Pâtes', 'Crème', 'Parmesan', 'Ail'], image: `${imagePath}pasta.jpg` },
        { id: 3, name: 'Tarte Tatin', category: 'desserts', description: 'Tarte aux pommes caramélisées, servie chaude.', price: 6.50, ingredients: ['Pommes', 'Sucre', 'Beurre', 'Pâte feuilletée'], image: `${imagePath}tarte.jpg` },
        { id: 4, name: 'Coca-Cola', category: 'boissons', description: 'Boisson gazeuse rafraîchissante.', price: 2.50, ingredients: ['Eau gazeuse', 'Sucre', 'Arômes'], image: `${imagePath}coca.jpg` },
        { id: 5, name: 'Gaspacho', category: 'entrées', description: 'Soupe froide à base de tomates, concombre et poivron.', price: 7.50, ingredients: ['Tomates', 'Concombre', 'Poivron', 'Oignon', 'Ail'], image: `${imagePath}gaspacho.jpg` },
        { id: 6, name: 'Filet de Saumon', category: 'plats', description: 'Saumon grillé, servi avec légumes et sauce citronnée.', price: 15.99, ingredients: ['Saumon', 'Légumes', 'Citron', 'Épices'], image: `${imagePath}saumon.jpg` },
    ]);

    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fonction pour filtrer le menu
    const filterMenuItems = () => {
        return selectedCategory === 'all'
            ? menuItems
            : menuItems.filter(item => item.category === selectedCategory);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mt-20 mb-20">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Menu</h1>

                {/* Filtre par catégorie */}
                <div className="mb-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border rounded-md text-black bg-white shadow"
                    >
                        <option value="all">Tous</option>
                        <option value="entrées">Entrées</option>
                        <option value="plats">Plats</option>
                        <option value="desserts">Desserts</option>
                        <option value="boissons">Boissons</option>
                    </select>
                </div>

                {/* Liste des plats et boissons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterMenuItems().map(item => (
                        <div key={item.id} className="border border-gray-300 rounded-md shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{item.name} - {item.price.toFixed(2)} €</h2>
                                <p className="text-gray-600">{item.description}</p>
                                <h3 className="font-semibold text-gray-800 mt-2">Ingrédients :</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    {item.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
