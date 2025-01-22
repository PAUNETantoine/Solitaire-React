import React from 'react';
import { createRoot } from 'react-dom/client';
//import './index.css'; // Fichier de styles global
import App from './App'; // Le composant principal de votre application

// Rendu de l'application React dans l'élément avec id 'root'
const rootElement = document.getElementById("root");
const root        = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);