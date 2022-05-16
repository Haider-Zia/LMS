import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import { logout } from "../loginAndSignup/loginAndSignupSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header className="header">
      {pathname === "/" && <h1>Login to your account</h1>}
      {pathname === "/signup" && <h1>Create an account</h1>}
      {pathname === "/adminDashboard" && <h1>Admin Dashboard</h1>}
      {pathname === "/teacherDashboard" && <h1>Teacher Dashboard</h1>}
      {pathname === "/studentDashboard" && <h1>Student Dashboard</h1>}
      {pathname.includes("/lectures") && <h1>Lectures</h1>}
      {(pathname === "/adminDashboard" ||
        pathname === "/teacherDashboard" ||
        pathname === "/studentDashboard") && (
        <Button
          color="red"
          text="Logout"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        />
      )}
      {pathname.includes("/lectures") && (
        <Button
          color="black"
          text="Go Back"
          onClick={() => {
            navigate(-1);
          }}
        />
      )}
    </header>
  );
}

export default Header;
