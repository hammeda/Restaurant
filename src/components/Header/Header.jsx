// src/components/Header/Header.jsx

import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between bg-gray-800 text-white w-full fixed top-0 left-0 z-50 p-4 h-24"> {/* Padding ajouté ici */}
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="text-lg font-bold">
                    <a href="/">
                        <img src="src/resources/images/logo.png" alt="Logo" className="w-20 h-20" />
                    </a>
                </div>
                <nav className="flex space-x-4">
                    <a href="/" className="hover:text-gray-400">Accueil</a>
                    <a href="/about" className="hover:text-gray-400">À propos</a>
                    <a href="/menu" className="hover:text-gray-400">Menu</a>
                    <a href="/contact" className="hover:text-gray-400">Contact</a>
                    <a href="/reservation" className="hover:text-gray-400">Réservation</a>
                </nav>
                <div>
                    <a href="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
                        Log In
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
