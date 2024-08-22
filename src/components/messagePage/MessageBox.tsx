// MessageBox.js
import React from 'react';
import './MessageBox.scss';

const MessageBox = ({ message, isSentByUser }) => (
  <div className={`message ${isSentByUser ? 'sent' : 'received'}`}>
    {/* {!isSentByUser && <img src={message.avatar} alt="avatar" className="avatar" />} */}
    {!isSentByUser && <p> ₹ </p>}
    <div className="message-content">
      <p>{message.content}</p>
      <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
    </div>
  </div>
);

export default MessageBox;
