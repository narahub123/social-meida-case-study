import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./Test.tsx";
import Settings from "./Settings/Settings.tsx";
import Preferences from "./Settings/Preferences/Preferences.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
