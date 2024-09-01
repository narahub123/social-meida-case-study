import { Outlet, useLocation } from "react-router-dom";

function Test() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes("/auth") ? "" : "헤더"}
      <Outlet />
    </>
  );
}

export default Test;
