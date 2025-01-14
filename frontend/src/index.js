import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Ensure this imports Tailwind's base styles
import App from './App';  // The main App component

const root = ReactDOM.createRoot(document.getElementById('root'));  // Accessing the div with id 'root'
root.render(
  <React.StrictMode>
    <App />  {/* Rendering the main App component */}
  </React.StrictMode>
);
