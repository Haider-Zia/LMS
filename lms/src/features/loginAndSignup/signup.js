import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

function Signup() {
  // Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [type, setType] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  // Other Variables
  const accounts = useSelector((state) => state.loginAndSignup.accounts);
  const loggedInAsAdmin = useSelector(
    (state) => state.loginAndSignup.loggedInAsAdmin
  );
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  const loggedInAsStudent = useSelector(
    (state) => state.loginAndSignup.loggedInAsStudent
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (loggedInAsAdmin) {
      navigate("/adminDashboard");
    } else if (loggedInAsTeacher) {
      navigate("/teacherDashboard");
    } else if (loggedInAsStudent) {
      navigate("/studentDashboard");
    }
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setSignupError(true);
      setSignupErrorMessage("Please enter email");
    } else if (!validator.isEmail(email)) {
      setSignupError(true);
      setSignupErrorMessage("Please enter a valid email");
    } else if (!password) {
      setSignupError(true);
      setSignupErrorMessage("Please enter password");
    } else if (!password2) {
      setSignupError(true);
      setSignupErrorMessage("Please enter password");
    } else if (!(password2 === password)) {
      setSignupError(true);
      setSignupErrorMessage("Passwords don't match");
    } else {
      const account = accounts.find(
        (accountIterator) => accountIterator.email === email
      );
      if (account == null) {
        const body = { email, pass: password, personType: type };
        await fetch(`${process.env.REACT_APP_API_URL}/person`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        navigate("/");
      } else {
        setSignupError(true);
        setSignupErrorMessage("Email is already in use");
      }
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="add-email">
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="add-password">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="add-password2">
          <input
            type="password"
            placeholder="Confirm Password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
      </div>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="add-password2">
          <input
            style={{ margin: 20 }}
            type="radio"
            value="admin"
            name="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />{" "}
          Admin
          <input
            style={{ margin: 20 }}
            type="radio"
            value="teacher"
            name="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />{" "}
          Teacher
          <input
            style={{ margin: 20 }}
            type="radio"
            value="student"
            name="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />{" "}
          Student
        </label>
      </div>
      {signupError ? (
        <div className="error-message">
          <p>{signupErrorMessage}</p>
        </div>
      ) : (
        <div className="empty-space" />
      )}
      <input type="submit" value="Signup" className="btn btn-block" />
      <p style={{ marginTop: 15, textAlign: "center" }}>
        Already have an account? <Link to="/"> Login</Link>
      </p>
    </form>
  );
}

export default Signup;
