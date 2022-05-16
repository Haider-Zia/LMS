/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
  },
  reducers: {
    createClass: (state, action) => {
      state.classes.push(action.payload);
    },
    // Should receive an id as action.payload
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(
        (classesIterator) => classesIterator.id !== action.payload
      );
    },
    loadClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createClass, deleteClass, loadClasses } = classesSlice.actions;

export default classesSlice.reducer;
