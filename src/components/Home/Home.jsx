// src/components/Home/Home.jsx
import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            {/* Image d'accueil */}
            <div className="relative w-full h-80">
                <img
                    src="src/resources/images/accueil.jpg" // Remplacez par votre image
                    alt="Restaurant"
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
                    <h1 className="text-4xl text-white font-bold">Bienvenue au Restaurant Gourmand</h1>
                    {/* Bouton de réservation sous le texte */}
                    <div className="mt-12">
                        <a
                            href="/reservation"
                            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Réserver une table
                        </a>
                    </div>
                </div>
            </div>


            {/* Section de bienvenue */}
            <section className="mt-8 p-6 text-center bg-white rounded-lg shadow-md">
                <h2 className="text-gray-600 text-2xl font-semibold mb-2">Découvrez notre cuisine</h2>
                <p className="text-gray-600">
                    Au Restaurant Gourmand, nous vous proposons des plats faits maison avec des ingrédients frais
                    et locaux. Que vous soyez ici pour un déjeuner rapide ou un dîner romantique, nous avons quelque
                    chose pour vous.
                </p>
                <p className="mt-2 text-gray-600">
                    Chaque plat est soigneusement préparé par nos chefs passionnés, qui mettent un point d'honneur à utiliser des produits de saison pour garantir la meilleure qualité.
                </p>
            </section>

            {/* Section des plats recommandés */}
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src="src/resources/images/plat1.jpg" // Remplacez par votre image
                        alt="Plat 1"
                        className="object-cover w-full h-40"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Plat Spécial 1</h3>
                        <p className="text-gray-600">Description de ce plat délicieux.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src="src/resources/images/plat2.jpg" // Remplacez par votre image
                        alt="Plat 2"
                        className="object-cover w-full h-40"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Plat Spécial 2</h3>
                        <p className="text-gray-600">Description de ce plat délicieux.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src="src/resources/images/plat3.jpg" // Remplacez par votre image
                        alt="Plat 3"
                        className="object-cover w-full h-40"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Plat Spécial 3</h3>
                        <p className="text-gray-600">Description de ce plat délicieux.</p>
                    </div>
                </div>
            </section>




        </div>
    );
};

export default Home;
