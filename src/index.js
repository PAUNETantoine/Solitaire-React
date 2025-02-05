import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Le composant principal de l'application

// Rendu de l'application React dans l'élément avec id 'root'
const rootElement = document.getElementById("root");
const root        = createRoot(rootElement);

root.render(
    <App/>
);