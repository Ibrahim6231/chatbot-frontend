// import React, { useState } from 'react';
// import './MessageWindow.scss';

// const Message = ({ message, isSentByUser }) => (
//   <div className={`message ${isSentByUser ? 'sent' : 'received'}`}>
//     {!isSentByUser && <img src={message.avatar} alt="avatar" className="avatar" />}
//     <div className="message-content">
//       <p>{message.content}</p>
//       <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
//     </div>
//   </div>
// );

// const ChatWindow = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   const userId = '123'; // Current user ID
//   const currentChat = { type: 'personal', id: '456', name: 'Friend Name' }; // Example chat context

//   // Simulate sending a message
//   const sendMessage = () => {
//     if (newMessage.trim() === '') return;
    
//     const message = {
//       content: newMessage,
//       senderId: userId,
//       avatar: 'https://placekitten.com/50/50', // Example avatar
//       createdAt: new Date(),
//     };

//     setMessages([...messages, message]);
//     setNewMessage('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <img src="https://placekitten.com/40/40" alt="avatar" className="chat-avatar" />
//         <h2>{currentChat.name}</h2>
//       </div>
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <Message
//             key={index}
//             message={message}
//             isSentByUser={message.senderId === userId}
//           />
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;


// MessageWindow.js
import React from 'react';
import MessageBox from './MessageBox';
import Input from './InputBox';
import './MessageWindow.scss';

const MessageWindow = ({ messages, onSendMessage, userId }) => {
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            message={message}
            isSentByUser={message.senderId === userId}
          />
        ))}
      </div>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default MessageWindow;
