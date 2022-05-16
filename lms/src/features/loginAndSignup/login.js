import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import {
  loginAsAdmin,
  loginAsTeacher,
  loginAsStudent,
  loadAccounts,
} from "./loginAndSignupSlice";

function Login() {
  // Local State
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // API call and initializing store
  const getAccounts = async () => {
    try {
      const formattedData = [];
      const response = await fetch(`${process.env.REACT_APP_API_URL}/person`);
      const jsonData = await response.json();
      jsonData.map(
        ({ person_id: id, email, pass: password, person_type: type }) =>
          formattedData.push({ id, email, password, type })
      );
      await dispatch(loadAccounts(formattedData));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Redirect if already logged in
    if (loggedInAsAdmin) {
      navigate("/adminDashboard");
    } else if (loggedInAsTeacher) {
      navigate("/teacherDashboard");
    } else if (loggedInAsStudent) {
      navigate("/studentDashboard");
    }
    getAccounts();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailField) {
      setLoginError(true);
      setLoginErrorMessage("Please enter email");
    } else if (!validator.isEmail(emailField)) {
      setLoginError(true);
      setLoginErrorMessage("Please enter a valid email");
    } else if (!passwordField) {
      setLoginError(true);
      setLoginErrorMessage("Please enter password");
    } else {
      const account = accounts.find(
        (accountIterator) =>
          accountIterator.email === emailField &&
          accountIterator.password === passwordField
      );
      if (account != null) {
        if (account.type === "admin") {
          dispatch(loginAsAdmin(emailField));
          navigate("/adminDashboard");
        } else if (account.type === "teacher") {
          dispatch(loginAsTeacher(emailField));
          navigate("/teacherDashboard");
        } else if (account.type === "student") {
          dispatch(loginAsStudent(emailField));
          navigate("/studentDashboard");
        }
      } else {
        setLoginError(true);
        setLoginErrorMessage("Email or password is incorrect");
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
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="add-password">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
          />
        </label>
      </div>
      {loginError ? (
        <div className="error-message">
          <p>{loginErrorMessage}</p>
        </div>
      ) : (
        <div className="empty-space" />
      )}
      <input type="submit" value="Login" className="btn btn-block" />
      <p style={{ marginTop: 15, textAlign: "center" }}>
        Don&apos;t have an account? <Link to="/signup"> Signup</Link>
      </p>
    </form>
  );
}

export default Login;
