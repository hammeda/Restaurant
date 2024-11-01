import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Home from "../components/Home/Home.jsx";
import Reservation from "../components/Reservation/Reservation.jsx";
import UserReservationsPage from "../components/Reservation/UserReservationsPage.jsx";
import GestionReservation from "../components/Admin/GestionReservation.jsx";
import GestionTable from "../components/Admin/GestionTable.jsx";
import GestionUser from "../components/Admin/GestionUser.jsx";
import GestionMenu from "../components/Admin/GestionMenu.jsx";
import Menu from "../components/Menu/menu.jsx";
import LoginPage from "../components/LoginPage/LoginPage.jsx";
import SignUp from "../components/SignupPage/SignupPage.jsx";
import Profil from "../components/Profil/Profile.jsx";
import Contact from "../components/Contact/Contact.jsx";
import ConfirmationPage from "../components/ConfirmReservation/ConfirmationPage.jsx";

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

export const AppRoutes = () => {
    const token = sessionStorage.getItem('token'); // Récupérer le token
    const role = getUserRoleFromToken(); // Récupérer le rôle de l'utilisateur
    console.log(role);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-16">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/menu" element={<Menu />} />

                        {/* Routes protégées */}
                        <Route path="/profil" element={token ? <Profil /> : <Navigate to="/login" />} />
                        <Route path="/reservation" element={token ? <Reservation /> : <Navigate to="/login" />} />
                        <Route path="/reserver" element={token ? <UserReservationsPage /> : <Navigate to="/login" />} />
                        <Route path="/confirmation" element={token ? <ConfirmationPage /> : <Navigate to="/login" />} />

                        {/* Routes protégées pour ADMIN */}
                        <Route path="/gestion-reservation" element={token && role === 'ROLE_ADMIN' ? <GestionReservation /> : <Navigate to="/login" />} />
                        <Route path="/gestion-table" element={token && role === 'ROLE_ADMIN' ? <GestionTable /> : <Navigate to="/login" />} />
                        <Route path="/gestion-user" element={token && role === 'ROLE_ADMIN' ? <GestionUser /> : <Navigate to="/login" />} />
                        <Route path="/gestion-menu" element={token && role === 'ROLE_ADMIN' ? <GestionMenu /> : <Navigate to="/login" />} />
                        {/* <Route path="/gestion-reservation" element={token ? <GestionReservation /> : <Navigate to="/login" />} />
                        <Route path="/gestion-table" element={token ? <GestionTable /> : <Navigate to="/login" />} />
                        <Route path="/gestion-user" element={token ? <GestionUser /> : <Navigate to="/login" />} /> */}

                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};
