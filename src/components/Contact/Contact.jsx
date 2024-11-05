// src/components/ContactPage.jsx

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer le formulaire, comme une requête API.
        setSubmitted(true);
        // Réinitialiser le formulaire après soumission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Filtre sombre */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contactez-nous</h1>

                {submitted && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <strong className="font-bold">Merci !</strong>
                        <span className="block sm:inline"> Votre message a été envoyé.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Envoyer
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Informations de Contact</h2>
                    <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-blue-600 mr-2" />
                        <p className="text-gray-700">123 Rue de la Gastronomie, Paris, France</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaPhone className="text-blue-600 mr-2" />
                        <p className="text-gray-700">+33 1 23 45 67 89</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaEnvelope className="text-blue-600 mr-2" />
                        <p className="text-gray-700">contact@restaurant.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
