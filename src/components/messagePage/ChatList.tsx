
// ChatList.js
import React from 'react';
import './ChatList.scss';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      <div> Logout </div>
      {chats.map((chat, index) => (
        <div key={index} className="chat-list-item" onClick={() => onSelectChat(chat)}>
          <img src={chat.avatar} alt="avatar" className="chat-avatar" />
          <div className="chat-info">
            <h3>{chat.name}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
