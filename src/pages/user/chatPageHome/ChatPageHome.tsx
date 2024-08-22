// ChatPageHome.js
import React, { useState } from 'react';
import ChatList from '../../../components/messagePage/ChatList';
import MessageWindow from '../../../components/messagePage/MessageWindow';
import './ChatPageHome.scss';
import ChatHeader from '../../../components/messagePage/ChatHeader';

const ChatPageHome = () => {
  const userId = '123'; // Current user ID
  const [chats] = useState([
    {
      id: '1',
      name: 'Friend 1',
      avatar: 'https://placekitten.com/40/40',
      lastMessage: 'Hey there!',
    },
    {
      id: '2',
      name: 'Group Chat',
      avatar: 'https://placekitten.com/41/41',
      lastMessage: 'Meeting at 10 AM',
    },
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    // Here, fetch messages for the selected chat
    setMessages([
      {
        content: 'Hello!',
        senderId: '123',
        createdAt: new Date(),
      },
      {
        content: 'Hi, how are you?',
        senderId: '456',
        avatar: chat.avatar,
        createdAt: new Date(),
      },
    ]);
  };

  const handleSendMessage = (newMessage) => {
    const message = {
      content: newMessage,
      senderId: userId,
      createdAt: new Date(),
    };

    setMessages([...messages, message]);
  };

  return (
    <div id="chat-page">
      <div className="header">
      <ChatHeader userName={"user name"} />
      </div>
      <div className="container">
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
        {currentChat && (
          <MessageWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPageHome;
