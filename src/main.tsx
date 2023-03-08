import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Removed Strict mode for now, so that codeNinja wont display duplicate clg
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
