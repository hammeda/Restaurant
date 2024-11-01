import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("Payload du token:", payload); // Ajoutez cette ligne pour vérifier le payload
            return payload.userId; // Modifiez ici pour utiliser 'userId'
        } catch (error) {
            console.error('Erreur lors du parsing du token:', error);
            return null;
        }
    }
    return null;
};


const Reservation = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [localisation, setLocalisation] = useState('');
    const [tables, setTables] = useState([]); // Pour les tables disponibles
    const [selectedTable, setSelectedTable] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDate(e.target.value);
        setSelectedTable(null);
        setErrorMessage(''); // Réinitialiser le message d'erreur
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        setSelectedTable(null);
        setErrorMessage(''); // Réinitialiser le message d'erreur
    };

    const handleLocalisationChange = (e) => {
        setLocalisation(e.target.value);
        setSelectedTable(null);
        setErrorMessage(''); // Réinitialiser le message d'erreur
    };

    // Fonction pour vérifier les tables disponibles
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if (date && time && localisation && numberOfPeople) {
            axios.get('http://localhost:9090/api/reservations/available', {
                params: {
                    date,
                    time,
                    localisation,
                    numberOfPeople, // Assurez-vous que ce paramètre est bien transmis
                },
                headers: {
                    'Authorization': `Bearer ${token}`, // Inclure le token
                }
            })
                .then(response => {
                    console.log(response.data);
                    setTables(response.data);
                    setErrorMessage(response.data.length === 0 ? 'Aucune table disponible pour cette date et heure.' : ''); // Vérifier si des tables sont disponibles
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des tables disponibles:", error);
                    setErrorMessage('Erreur lors de la récupération des tables.'); // Message d'erreur général
                });
        } else {
            setErrorMessage('Veuillez renseigner tous les critères (date, heure, nombre de personnes et localisation).'); // Message d'erreur si les critères ne sont pas remplis
        }
    }, [date, time, localisation, numberOfPeople]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const userId = getUserIdFromToken(); // Appelez la fonction ici
        console.log("Utilisateur connecté:", userId); // Vérifiez que cela affiche maintenant l'ID correct
        console.log("Token récupéré:", token);

        axios.post('http://localhost:9090/api/reservations', {
            date: date, // Assurez-vous que la date est au format LocalDate
            time: time, // Assurez-vous que l'heure est au format LocalTime
            numberOfPeople: numberOfPeople, // Utilisez numberOfGuests au lieu de numberOfPeople
            restaurantTableId: selectedTable?.id, // Assurez-vous que cela correspond à restaurantTableId
            userId: userId // ID de l'utilisateur
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Inclure le token
            }
        })

            .then(() => {
                navigate('/confirmation', { state: { date, time, numberOfPeople, localisation, selectedTable } });
            })
            .catch(error => {
                console.error("Erreur lors de la réservation:", error);
                setErrorMessage('Erreur lors de la réservation.'); // Message d'erreur sur la réservation
            });
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

            <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-2xl z-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Réserver une Table</h1>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Affichage du message d'erreur */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" id="date" value={date} onChange={handleDateChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900" required />
                    </div>

                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Heure</label>
                        <select id="time" value={time} onChange={handleTimeChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900" required>
                            <option value="">Sélectionner une heure</option>
                            {generateTimeOptions().map((timeOption) => (
                                <option key={timeOption} value={timeOption}>{timeOption}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
                        <select id="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900" required>
                            {[...Array(10).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="localisation" className="block text-sm font-medium text-gray-700">Préférences</label>
                        <select id="localisation" value={localisation} onChange={handleLocalisationChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900">
                            <option value="">Aucune préférence</option>
                            <option value="INTERIEUR">Intérieur</option>
                            <option value="EXTERIEUR">Extérieur</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sélectionnez une Table</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tables.map((table) => (
                                <div key={table.id} onClick={() => setSelectedTable(table)} className={`cursor-pointer rounded-lg border p-4 transition-transform transform hover:scale-105 ${selectedTable?.id === table.id ? 'border-blue-600' : 'border-gray-300'}`}>
                                    <img src={`http://localhost:9090/images/table/${table.pictureName}`} alt={table.pictureName} className="w-full h-32 object-cover rounded-md mb-2" />
                                    <h3 className="font-semibold text-gray-800">{table.name}</h3>
                                    <p className="text-gray-600">{table.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105" disabled={!selectedTable}>
                        Confirmer la Réservation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reservation;
