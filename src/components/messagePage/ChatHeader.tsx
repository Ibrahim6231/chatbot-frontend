import React from 'react';
import './ChatHeader.scss';
import { FaUserCircle, FaSignOutAlt, FaCogs, FaUsers } from 'react-icons/fa';
import { useAppDispatch } from '../../app/reduxHooks';
import { logOutUser } from '../../app/slices/authSlice';

//{ userName, onLogout, onAddGroup }
const ChatHeader = ({ userName }) => {
    const dispatch = useAppDispatch();

    const handleAddGroup = () => {
        
    }

    const handleLogout = () => {
        alert("you will be loggedout!")
        dispatch(logOutUser());
    }
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <FaUserCircle className="user-avatar" />
        <span className="user-name">{userName}</span>
      </div>
      <div className="chat-header-right">
        <FaUsers className="header-icon" onClick={handleAddGroup} title="Add Group" />
        <FaCogs className="header-icon" title="Settings" />
        <FaSignOutAlt className="header-icon" onClick={handleLogout} title="Logout" />
      </div>
    </div>
  );
};

export default ChatHeader;
