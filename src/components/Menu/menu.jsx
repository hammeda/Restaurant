import React, { useState, useEffect } from 'react';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]); // État pour stocker les éléments du menu
    const [selectedType, setSelectedType] = useState('all'); // État pour le filtre de type
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle pour la pagination
    const [pageSize, setPageSize] = useState(10); // Taille de la page
    const [totalPages, setTotalPages] = useState(0); // Nombre total de pages
    const token = 'your-auth-token'; // Remplacez par votre logique d'authentification

    // Fonction pour récupérer les éléments du menu depuis l'API
    const fetchMenuItems = async () => {
        try {
            const url = selectedType === 'all'
                ? `http://localhost:9090/api/menu?page=${currentPage}&size=${pageSize}`
                : `http://localhost:9090/api/menu/type?type=${selectedType}&page=${currentPage}&size=${pageSize}`;

            const response = await fetch(url);
            const data = await response.json();
            setMenuItems(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error('Erreur lors de la récupération des éléments du menu:', error);
        }
    };

    // Effectue une récupération des éléments lorsque la catégorie ou la page change
    useEffect(() => {
        fetchMenuItems();
    }, [selectedType, currentPage]); // Dépendances : changez le type ou la page

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
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setCurrentPage(0); // Réinitialiser la page à 0 lors du changement de type
                        }}
                        className="p-2 border rounded-md text-black bg-white shadow"
                    >
                        <option value="all">Tous</option>
                        <option value="ENTREE">Entrées</option>
                        <option value="PLAT">Plats</option>
                        <option value="DESSERT">Desserts</option>
                        <option value="BOISSON">Boissons</option>
                    </select>
                </div>

                {/* Liste des plats et boissons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map(item => (
                        <div key={item.id} className="border border-gray-300 rounded-md shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <img src={`http://localhost:9090/images/menu/${item.pictureName}`} alt={item.name} className="w-full h-48 object-cover" />
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

                {/* Navigation pour la pagination */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Précédent
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
