// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 w-full">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Liens de navigation */}
                <nav className="flex space-x-4">
                    <a href="/privacy" className="hover:text-gray-400">Politique de confidentialité</a>
                    <a href="/terms" className="hover:text-gray-400">Conditions d'utilisation</a>
                    <a href="/contact" className="hover:text-gray-400">Contact</a>
                </nav>

                {/* Texte de droit d'auteur */}
                <div className="text-sm">
                    © {new Date().getFullYear()} MonEntreprise. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
