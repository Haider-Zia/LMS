import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Classes from "../../classes/classes";
import AddClass from "../../classes/addClass";

function AdminDashboard() {
  const navigate = useNavigate();
  const loggedInAsAdmin = useSelector(
    (state) => state.loginAndSignup.loggedInAsAdmin
  );
  const loggedInAsStudent = useSelector(
    (state) => state.loginAndSignup.loggedInAsStudent
  );
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  useEffect(() => {
    // Must be logged in to access this page
    if (!loggedInAsAdmin) {
      if (loggedInAsStudent) {
        navigate("/studentDashboard");
      } else if (loggedInAsTeacher) {
        navigate("/studentTeacher");
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <AddClass />
      <Classes />
    </div>
  );
}

export default AdminDashboard;
