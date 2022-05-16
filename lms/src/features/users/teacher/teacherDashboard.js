import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Classes from "../../classes/classes";

function TeacherDashboard() {
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
    if (!loggedInAsTeacher) {
      if (loggedInAsAdmin) {
        navigate("/adminDashboard");
      } else if (loggedInAsStudent) {
        navigate("/studentDashboard");
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <Classes />
    </div>
  );
}

export default TeacherDashboard;
