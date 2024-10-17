import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Images de tables fictives
const tablesData = [
    { id: 1, name: 'Table Romance', image: 'src/resources/images/table-romance.jpg', description: 'Idéale pour un dîner romantique' },
    { id: 2, name: 'Table Famille', image: 'src/resources/images/table-famille.jpg', description: 'Parfaite pour les repas en famille' },
    { id: 3, name: 'Table Terrasse', image: 'src/resources/images/table-terrasse.jpg', description: 'Profitez de l\'extérieur sous les étoiles' },
];

const Reservation = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [preferences, setPreferences] = useState('');
    const [selectedTable, setSelectedTable] = useState(null);
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDate(e.target.value);
        setSelectedTable(null); // Reset table selection when date changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Rediriger vers la page de confirmation
        navigate('/confirmation', { state: { date, time, numberOfPeople, selectedTable } });
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = String(hour).padStart(2, '0');
                const formattedMinute = String(minute).padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return options;
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(src/resources/images/restaurant-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Filtre sombre */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Augmenter max-w de lg à xl ou 2xl pour un formulaire plus large */}
            <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-2xl z-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Réserver une Table</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Sélection de la date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleDateChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    {/* Sélection de l'heure */}
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
                            required
                        >
                            <option value="">Sélectionner une heure</option>
                            {generateTimeOptions().map((timeOption) => (
                                <option key={timeOption} value={timeOption}>{timeOption}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sélection du nombre de personnes */}
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
                        <select
                            id="number"
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
                            required
                        >
                            {[...Array(10).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>

                    {/* Préférences */}
                    <div>
                        <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Préférences</label>
                        <select
                            id="preferences"
                            value={preferences}
                            onChange={(e) => setPreferences(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
                        >
                            <option value="">Aucune préférence</option>
                            <option value="interior">Intérieur</option>
                            <option value="exterior">Extérieur</option>
                        </select>
                    </div>

                    {/* Affichage des tables disponibles */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sélectionnez une Table</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tablesData.map((table) => (
                                <div
                                    key={table.id}
                                    onClick={() => setSelectedTable(table)}
                                    className={`cursor-pointer rounded-lg border p-4 transition-transform transform hover:scale-105 ${selectedTable?.id === table.id ? 'border-blue-600' : 'border-gray-300'}`}
                                >
                                    <img src={table.image} alt={table.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h3 className="font-semibold text-gray-800">{table.name}</h3>
                                    <p className="text-gray-600">{table.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bouton de confirmation */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        disabled={!selectedTable} // Disable button if no table is selected
                    >
                        Confirmer la Réservation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reservation;
