import { lazy } from 'react';
const ChatHomePage = lazy(() => import("../pages/user/chatPageHome/ChatPageHome"));


const UserRoutes = [
  {
    path: "/home",
    component: ChatHomePage,
    name: "chatHomePage",
  }
]

export default UserRoutes;
