import React, { useState, useEffect } from 'react';

const socket = new WebSocket('ws://localhost:8000/ws/chat/');

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected to Django Channels server');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    socket.send(inputMessage);
    setInputMessage('');
  };

  return (
    <div>
      <h1>Real-time Chat Application</h1>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
