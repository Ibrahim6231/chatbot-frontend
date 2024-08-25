import React, { useEffect, useRef } from 'react';
import MessageBox from './MessageBox';
import Input from './InputBox';
import './MessageWindow.scss';

const MessageWindow = ({ messages, onSendMessage, setMessages }) => {

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            message={message}
            messages={messages}
            setMessages={setMessages}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default MessageWindow;
