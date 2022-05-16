import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./features/header/header";
import Footer from "./features/footer/footer";
import Login from "./features/loginAndSignup/login";
import AdminDashboard from "./features/users/admin/adminDashboard";
import TeacherDashboard from "./features/users/teacher/teacherDashboard";
import StudentDashboard from "./features/users/student/studentDashboard";
import Signup from "./features/loginAndSignup/signup";
import Lectures from "./features/lectures/lectures";

function App() {
  return (
    <Router>
      <div>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/class/:id/lectures" element={<Lectures />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
