import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import App from './App';
import Context from './Store/Context';
// Create a root for the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside the root using createRoot
root.render(
  <React.StrictMode>

     <Context>
      <App />
     </Context>
     
  </React.StrictMode>
);
