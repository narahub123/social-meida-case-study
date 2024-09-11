import "./test.css";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function Test() {
  const { pathname } = useLocation();

  return (
    <div className="test">
      {pathname.includes("/auth") ? "" : <Sidebar />}
      <Outlet />
    </div>
  );
}

export default Test;
