import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./Test.tsx";

import Auth from "./pages/Auth/Auth.tsx";
import Home from "./pages/Home/Home.tsx";
import Settings from "./Settings/Settings.tsx";
import Preferences from "./Settings/Preferences/Preferences.tsx";

const login = false;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    children: [
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
