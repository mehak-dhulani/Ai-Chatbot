import React, { useState, useEffect } from 'react';
import './ChatBox.css';

function ChatBox() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) {
      setError('Please enter a message.');
      return;
    }

    setError('');
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'your-exposed-key',
          
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const botText = data?.choices?.[0]?.message?.content || 'No response';
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botText };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { id: Date.now() + 1, sender: 'bot', text: '❌ Error contacting AI' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="chat-box">
      <div className="welcome">🤖 Welcome to the AI Chatbot</div>

      <div className="chat-history">
        {messages.length === 0 && <p className="empty-chat">Start a conversation below...</p>}
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
            <div className="timestamp">{new Date().toLocaleTimeString()}</div>
            <div className="msg-actions">
              <button onClick={() => handleCopy(msg.text)}>📋</button>
              <button onClick={() => handleDelete(msg.id)}>🗑️</button>
            </div>
          </div>
        ))}
        {loading && <div className="message bot"><div className="message-content">Typing...</div></div>}
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
