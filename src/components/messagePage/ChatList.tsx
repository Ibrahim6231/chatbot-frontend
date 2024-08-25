
import React from 'react';
import './ChatList.scss';
import { IoIosChatboxes, IoMdRefresh } from "react-icons/io";

const ChatList = ({ chats, onSelectChat, currentGroup }) => {

  const isSelectedClass = (chat) => {
    if (chat?._id == currentGroup?._id) {
      return "selected"
    } else {
      return ""
    }

  }
  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <div key={index} className={`chat-list-item ${isSelectedClass(chat)}`} onClick={() => onSelectChat(chat)}>
          <IoIosChatboxes className="chat-avatar" />
          <div className="chat-info">
            <h3>{chat.name}</h3>
            {isSelectedClass(chat) && <div className="refresh"> <IoMdRefresh /></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
