import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ThemeProvider } from './context/ThemeContext'; // ✅ Import your context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* ✅ Wrap App in ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
