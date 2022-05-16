/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const lecturesSlice = createSlice({
  name: "lectures",
  initialState: {
    lectures: [],
  },
  reducers: {
    createLecture: (state, action) => {
      state.lectures.push(action.payload);
    },
    // Should receive an id as action.payload
    deleteLecture: (state, action) => {
      state.lectures = state.lectures.filter(
        (lecturesIterator) => lecturesIterator.id !== action.payload
      );
    },
    loadLectures: (state, action) => {
      state.lectures = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createLecture, deleteLecture, loadLectures } =
  lecturesSlice.actions;

export default lecturesSlice.reducer;
