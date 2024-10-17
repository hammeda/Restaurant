import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Home from "../components/Home/Home.jsx";
import Reservation from "../components/Reservation/Reservation.jsx";
import GestionReservation from "../components/Admin/GestionReservation.jsx";
import GestionTable from "../components/Admin/GestionTable.jsx";
import GestionUser from "../components/Admin/GestionUser.jsx";
import Menu from "../components/Menu/menu.jsx";
import LoginPage from "../components/LoginPage/LoginPage.jsx";
import SignUp from "../components/SignupPage/SignupPage.jsx";
import Profil from "../components/Profil/Profile.jsx";
import Contact from "../components/Contact/Contact.jsx";
import ConfirmationPage from "../components/ConfirmReservation/ConfirmationPage.jsx";

export const AppRoutes = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-16"> {/* Ajout de padding pour tenir compte de la hauteur du header */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/confirmation" element={<ConfirmationPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gestion-reservation" element={<GestionReservation />} />
                        <Route path="/gestion-table" element={<GestionTable />} />
                        <Route path="/gestion-user" element={<GestionUser />} />
                        <Route path="/reservation" element={<Reservation />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};