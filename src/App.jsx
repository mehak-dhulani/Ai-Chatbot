import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class on body element
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>💬 Smart Chatbot</h1>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <ChatBox />
    </div>
  );
}

export default App;
