import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification des champs
        if (firstName === '' || lastName === '' || phoneNumber === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        // Logique pour créer un compte (ex: API)
        try {
            const response = await axios.post('http://localhost:9090/api/users', {
                prenom: firstName,
                nom: lastName,
                telephone: phoneNumber,
                email: email,
                password: password,
                roles: [] // Si tu veux gérer les rôles, tu peux les passer ici
            });
            setSuccess('Compte créé avec succès !');
            console.log('Réponse de l\'API:', response.data);

            // Réinitialiser les champs après la création
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        } catch (error) {
            setError('Erreur lors de la création du compte.');
            console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen"
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">Créer un Compte</h1>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Prénom</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Numéro de téléphone</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Créer un Compte
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-blue-600 hover:underline">
                        Déjà inscrit ? Connectez-vous ici.
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/" className="text-sm text-blue-600 hover:underline">
                        Retour à l'accueil.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
