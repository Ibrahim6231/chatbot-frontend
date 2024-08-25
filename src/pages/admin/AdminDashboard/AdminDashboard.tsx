import React, { useState } from 'react';
import './AdminDashboard.scss';
import UserTable from "../usersList/UsersList";
import InviteUser from '../../../components/adminDashboard/InviteUser';
import { Button } from '@mui/material';


const sidebarList = [
  { htmlText: "Add New User", component: <InviteUser /> },
  { htmlText: "Users List", component: <UserTable /> },
]
const Sidebar = () => {
  const [selectedSection, setSelelectedSection] = useState<any>(<InviteUser />)
  return (
    <div id="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul className="list">
          {sidebarList.map((ele, idx) => <li>
            <Button onClick={() => setSelelectedSection(ele.component)}>{ele.htmlText}</Button>
          </li>)}
        </ul>
      </div>
      <div className="selected-container">
        <div>
          {selectedSection}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
