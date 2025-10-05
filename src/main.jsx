import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path:"/chat",
    element: <ChatPage></ChatPage>
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
