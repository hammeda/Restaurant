// src/components/Confirmation/ConfirmationPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPrint, FaEnvelope, FaEdit, FaTimes } from 'react-icons/fa';

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, time, numberOfPeople, selectedTable } = location.state || {};

    if (!date || !time || !numberOfPeople || !selectedTable) {
        return <p className="text-center mt-24 text-white">Aucune réservation trouvée. Veuillez revenir à la page de réservation.</p>;
    }

    const handlePrint = () => {
        window.print();
    };

    const handleEmail = () => {
        // Logique pour envoyer un e-mail (peut nécessiter une configuration serveur)
        alert("Détails de la réservation envoyés par e-mail.");
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen" // Remplacez min-h-screen par h-screen
            style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >

            {/* Filtre sombre sur l'image de fond */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Contenu de la page */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-500 hover:scale-105">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Confirmation de Réservation</h1>
                    <div className="space-y-4 text-gray-700 text-lg">
                        <div className="flex items-center">
                            <span className="font-semibold">Date :</span>
                            <span className="ml-2">{date}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Heure :</span>
                            <span className="ml-2">{time}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Nombre de personnes :</span>
                            <span className="ml-2">{numberOfPeople}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Table :</span>
                            <span className="ml-2">{selectedTable.name}</span>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={handlePrint}
                            className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            <FaPrint className="mr-2" /> Imprimer
                        </button>
                        <button
                            onClick={handleEmail}
                            className="flex items-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                        >
                            <FaEnvelope className="mr-2" /> Envoyer par e-mail
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
