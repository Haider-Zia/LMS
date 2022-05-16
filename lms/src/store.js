import { configureStore } from "@reduxjs/toolkit";
import loginAndSignupReducer from "./features/loginAndSignup/loginAndSignupSlice";
import classesReducer from "./features/classes/classesSlice";
import lecturesReducer from "./features/lectures/lecturesSlice";

export default configureStore({
  reducer: {
    loginAndSignup: loginAndSignupReducer,
    classes: classesReducer,
    lectures: lecturesReducer,
  },
});
