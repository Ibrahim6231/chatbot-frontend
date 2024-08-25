import React from 'react';
import './ChatHeader.scss';
import { FaUserCircle, FaSignOutAlt, FaCogs, FaUsers } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { logOutUser } from '../../app/slices/authSlice';
import CreateGroupModal from '../modals/CreateGroup/CreateGroupModal';
import { Link } from 'react-router-dom';

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userState.user);
  const fullName = (user?.name?.first || "") + " " + (user?.name?.last || "");
  const isAdmin = Boolean(user?.role === "Admin");


  const handleLogout = () => {
    const isConfirm = window.confirm("you will be loggedout!")
    if(isConfirm){
      dispatch(logOutUser());
    }
  }
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <div>
          <FaUserCircle className="user-avatar" />
        </div>
        <div className='user-name'>
          <span>{fullName}</span>
          {isAdmin &&
            <span>
              You are Admin, Visit &nbsp;
              <Link to="/admin" className='app-link'>  Admin Dashboard </Link>
              &nbsp;to add user
            </span>
          }
        </div>
      </div>
      <div className="chat-header-right">
        <CreateGroupModal />
        <FaCogs className="header-icon" title="Settings" />
        <FaSignOutAlt className="header-icon" onClick={handleLogout} title="Logout" />
      </div>
    </div>
  );
};

export default ChatHeader;
