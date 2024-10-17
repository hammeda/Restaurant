import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './routes/AppRoutes.jsx'; // Garder l'import de AppRoutes
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes /> {/* Rendre directement les routes ici */}
  </StrictMode>,
);
