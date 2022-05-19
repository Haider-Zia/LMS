import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import FileDownload from "js-file-download";
import Axios from "axios";
import { deleteLecture } from "./lecturesSlice";
import Button from "../button/button";

function Lecture({ id }) {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.lectures);
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  const loggedInAsStudent = useSelector(
    (state) => state.loginAndSignup.loggedInAsStudent
  );
  const currentLecture = lectures.find(
    (lecturesIterator) => lecturesIterator.id === id
  );

  const deleteLectureFunction = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/lecture/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
    dispatch(deleteLecture(id));
  };

  const download = async () => {
    let jsonLectureUrl;
    // Get the url of the file for the current lecture
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/lecture/get_lecture_url/${id}`
      );
      jsonLectureUrl = await response.json();
    } catch (error) {
      console.error(error.message);
    }

    // Download the file at the fetched url
    Axios({
      url: `${process.env.REACT_APP_API_URL}/download/${jsonLectureUrl}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, `${currentLecture.lectureName}.pdf`);
    });
  };
  return (
    <div aria-hidden="true" className="task">
      <h3>
        {currentLecture.lectureName} {}
        {loggedInAsTeacher && (
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={deleteLectureFunction}
          />
        )}
        {loggedInAsStudent && (
          <Button color="black" text="Download" onClick={download} />
        )}
      </h3>
    </div>
  );
}

export default Lecture;

Lecture.propTypes = {
  id: PropTypes.number.isRequired,
};
