import React, { useState } from 'react';

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
    // send message via WebRTC Data Channel
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((msg, idx) => <p key={idx}>{msg}</p>)}
      </div>
      <input 
        placeholder="Type your message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
