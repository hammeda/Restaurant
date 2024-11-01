import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser l'erreur

        if (email === '' || password === '') {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Échec de la connexion : ' + response.statusText);
            }

            const data = await response.json();
            const token = data.token; // Récupérer le token

            // Stocker le token dans le sessionStorage
            sessionStorage.setItem('token', token); // Changer le nom en 'token' pour correspondre à votre Header
            console.log('Connexion réussie!', token); // Afficher le token dans la console

            // Rediriger vers la page d'accueil ou une autre page après connexion
            navigate('/'); // Redirection

            // Réinitialiser les champs après la connexion
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message); // Afficher l'erreur
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Adresse e-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Se connecter
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/recover-password" className="text-sm text-blue-600 hover:underline">
                        Mot de passe oublié ?
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/signup" className="text-sm text-blue-600 hover:underline">
                        Pas encore inscrit ? Créez un compte.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
