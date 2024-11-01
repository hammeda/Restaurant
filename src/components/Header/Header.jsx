import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [gestionMenuOpen, setGestionMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const getUserRoleFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.roles; // Assurez-vous que 'roles' existe dans votre payload
            } catch (error) {
                console.error('Erreur lors du parsing du token:', error);
                return null;
            }
        }
        return null;
    };
    useEffect(() => {
        // Récupère le rôle de l'utilisateur depuis le stockage de session
        const storedRole = getUserRoleFromToken();
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        navigate('/login');
    };

    const token = sessionStorage.getItem('token');

    return (
        <header className="flex items-center justify-between bg-gray-800 text-white w-full fixed top-0 left-0 z-50 p-4 h-24">
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

                    {role === 'ROLE_ADMIN' && (
                        <div className="relative">
                            <button
                                onClick={() => setGestionMenuOpen(!gestionMenuOpen)}
                                className="hover:text-gray-400 flex items-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                            >
                                Gestion
                            </button>
                            {gestionMenuOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <a href="/gestion-reservation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Gestion Réservation
                                        </a>
                                        <a href="/gestion-table" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Gestion Table
                                        </a>
                                        <a href="/gestion-user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Gestion Utilisateur
                                        </a>
                                        <a href="/gestion-menu" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Gestion Menu
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
                <div>
                    {token ? (
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="flex items-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                                >
                                    Compte
                                </button>
                            </div>
                            {menuOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <a href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Profil
                                        </a>
                                        <a href="/reserver" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Mes réservations
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Se déconnecter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
                            Connexion
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;