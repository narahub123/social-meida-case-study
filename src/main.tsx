import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./Test.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import Preferences from "./pages/Settings/Preferences/Preferences.tsx";
import Home from "./pages/Home/Home.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";

const login = false;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "preferences",
            element: <Preferences />,
          },
        ],
      },
      {
        path: "auth",
        element: login ? <Home /> : <Auth />,
        children: [],
      },
      {
        path: ":userId",
        element: <UserPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
