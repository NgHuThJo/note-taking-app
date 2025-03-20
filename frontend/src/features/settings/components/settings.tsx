import { Link, Outlet } from "react-router";

export function Settings() {
  return (
    <>
      <div>
        <Link to="color">Color Theme</Link>
        <Link to="font">Font Theme</Link>
        <Link to="change-password">Change Password</Link>
        <button type="button">Sign out</button>
      </div>
      <Outlet />
    </>
  );
}
