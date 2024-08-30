import { Outlet } from "react-router-dom";
import "./settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <Outlet />
    </div>
  );
};

export default Settings;
