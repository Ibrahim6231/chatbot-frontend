// ChatPageHome.js
import React, { useEffect, useState } from 'react';
import ChatList from '../../../components/messagePage/ChatList';
import MessageWindow from '../../../components/messagePage/MessageWindow';
import './ChatPageHome.scss';
import ChatHeader from '../../../components/messagePage/ChatHeader';
import { getGroupListApi } from '../../../api/group';
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { setChatList } from '../../../app/slices/groupChatSlice';
import { createMessageApi, getMessagesByGroupApi } from '../../../api/message';

const ChatPageHome = () => {
  const dispatch = useAppDispatch();
  const chatList = useAppSelector(state => state.groupChatState.chatList);
  const user = useAppSelector(state => state.userState.user);
  const userId = user?._id || "";

  const [currentGroup, setCurrentGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectChat = async (chat) => {
    setCurrentGroup(chat);
  };
  const updateCurrentGroupMessages = async () => {
    const groupMessages = await getMessagesByGroupApi(currentGroup._id);
    if (groupMessages) {
      groupMessages.forEach(msg => {
        if (msg.senderId == userId) {
          msg.isUserMsg = true;
        }
      })
      setMessages(groupMessages);
    }
  }

  const handleSendMessage = async (newMessage) => {
    const message = {
      content: newMessage,
      groupId: currentGroup._id,
      msgType: "text",
    }

    const savedMsg = await createMessageApi(message);
    if (savedMsg) {
      setMessages([
        ...messages,
        { ...savedMsg, isUserMsg: true }
      ]);
    }

  };

  const fetchGroupChatList = async () => {
    const chatList = await getGroupListApi();
    if (chatList) {
      dispatch(setChatList(chatList))
    }
  }
  useEffect(() => {
    fetchGroupChatList()

  }, [])

  useEffect(() => {
    if (currentGroup?._id) {
      updateCurrentGroupMessages();
    }
  }, [currentGroup])

  return (
    <div id="chat-page">
      <div className="header">
        <ChatHeader />
      </div>
      <div className="container">
        <ChatList chats={chatList} onSelectChat={handleSelectChat} currentGroup={currentGroup}/>
        {currentGroup && (
          <MessageWindow
            messages={messages}
            setMessages={setMessages}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPageHome;
