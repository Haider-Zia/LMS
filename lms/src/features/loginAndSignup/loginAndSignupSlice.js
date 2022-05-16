/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const loginAndSignupSlice = createSlice({
  name: "loginAndSignup",
  initialState: {
    loggedInAsAdmin: false,
    loggedInAsTeacher: false,
    loggedInAsStudent: false,
    currentEmail: "",
    accounts: [],
  },
  reducers: {
    loginAsAdmin: (state, action) => {
      state.loggedInAsAdmin = true;
      state.currentEmail = action.payload;
    },
    loginAsTeacher: (state, action) => {
      state.loggedInAsTeacher = true;
      state.currentEmail = action.payload;
    },
    loginAsStudent: (state, action) => {
      state.loggedInAsStudent = true;
      state.currentEmail = action.payload;
    },
    logout: (state) => {
      state.loggedInAsAdmin = false;
      state.loggedInAsStudent = false;
      state.loggedInAsTeacher = false;
      state.currentEmail = "";
    },
    signup: (state, action) => {
      state.accounts.push(action.payload);
    },
    loadAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginAsAdmin,
  loginAsTeacher,
  loginAsStudent,
  logout,
  signup,
  loadAccounts,
} = loginAndSignupSlice.actions;

export default loginAndSignupSlice.reducer;
