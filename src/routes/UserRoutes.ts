import { lazy } from 'react';
import AdminDashboard from '../pages/admin/AdminDashboard/AdminDashboard';
const ChatHomePage = lazy(() => import("../pages/user/chatPageHome/ChatPageHome"));


const UserRoutes = [
  {
    path: "/home",
    component: ChatHomePage,
    name: "chatHomePage",
  },
  {
    path: "/admin",
    component: AdminDashboard,
    name: "AdminDashboard",
  }
]

export default UserRoutes;
