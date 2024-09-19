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
import Posts from "./pages/UserPage/pages/Posts.tsx";
import Replies from "./pages/UserPage/pages/Replies.tsx";
import Media from "./pages/UserPage/pages/Media.tsx";
import Favorites from "./pages/UserPage/pages/Favorites.tsx";

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
        children: [
          {
            index: true,
            element: <Posts />,
          },
          {
            path: "/:userId/replies",
            element: <Replies />,
          },
          {
            path: "/:userId/media",
            element: <Media />,
          },
          {
            path: "/:userId/favorites",
            element: <Favorites />,
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
