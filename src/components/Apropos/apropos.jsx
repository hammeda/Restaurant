// src/components/About/About.jsx
import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
            <h1 className="mt-8 text-5xl font-bold mb-8 text-gray-800">À propos de nous</h1>

            {/* Notre histoire */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-10 w-full max-w-3xl">
                <img
                    src="src/resources/images/histoire.jpg" // Remplacez par votre image
                    alt="Notre Histoire"
                    className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Notre histoire</h2>
                <p className="text-gray-600 leading-relaxed">
                    Fondé en 2010, le Restaurant Gourmand est né de la passion d’un groupe d’amis pour la gastronomie.
                    Situé au cœur de Paris, notre établissement a pour mission d'offrir une expérience culinaire
                    mémorable à chaque client. Chaque plat est préparé avec des ingrédients frais et de saison, provenant
                    de producteurs locaux qui partagent notre engagement envers la qualité.
                </p>
            </section>

            {/* Notre philosophie */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-10 w-full max-w-3xl">
                <img
                    src="src/resources/images/plat3.jpg" // Remplacez par votre image
                    alt="Notre Philosophie"
                    className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Notre philosophie</h2>
                <p className="text-gray-600 leading-relaxed">
                    Au Restaurant Gourmand, nous nous engageons à offrir une expérience gastronomique qui dépasse
                    les attentes de nos clients. Notre philosophie repose sur la qualité, la créativité, l’authenticité
                    et l’hospitalité. Nous travaillons en étroite collaboration avec nos fournisseurs pour garantir
                    que chaque ingrédient respecte nos normes élevées.
                </p>
            </section>

            {/* Notre équipe */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-10 w-full max-w-3xl">
                <img
                    src="src/resources/images/equipe.jpg" // Remplacez par votre image
                    alt="Notre Équipe"
                    className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Notre équipe</h2>
                <p className="text-gray-600 leading-relaxed">
                    Notre équipe est notre plus grande force. Composée de chefs talentueux et de serveurs dévoués,
                    chacun de nos membres partage une passion pour la gastronomie et un engagement envers
                    l'excellence. Nos chefs, formés dans des établissements renommés, sont constamment à la recherche
                    de nouvelles inspirations pour ravir nos clients.
                </p>
            </section>

            {/* Ce qui nous rend unique */}
            <section className="bg-white rounded-lg shadow-lg p-8 mb-10 w-full max-w-3xl">
                <img
                    src="src/resources/images/unique.jpg" // Remplacez par votre image
                    alt="Ce qui nous rend unique"
                    className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Ce qui nous rend unique</h2>
                <p className="text-gray-600 leading-relaxed">
                    Nous allions tradition et innovation en respectant les recettes classiques tout en y apportant
                    notre touche personnelle. Nous organisons régulièrement des événements culinaires, des ateliers de cuisine,
                    et des soirées dégustation pour que nos clients puissent explorer davantage notre passion pour la gastronomie.
                </p>
            </section>

            {/* Rejoignez-nous */}
            <section className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
                <img
                    src="src/resources/images/rejoignez-nous.jpg" // Remplacez par votre image
                    alt="Rejoignez-nous"
                    className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Rejoignez-nous</h2>
                <p className="text-gray-600 leading-relaxed">
                    Que vous soyez un habitué ou que vous découvriez notre restaurant pour la première fois,
                    nous sommes impatients de vous accueillir. Faites un voyage culinaire avec nous et laissez-vous
                    emporter par les saveurs, l'ambiance et l'hospitalité qui font notre renommée.
                </p>
                <div className="mt-6 text-center">
                    <a
                        href="/reservation"
                        className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Réserver une table
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
