import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { loadLectures } from "./lecturesSlice";

function AddLecture({ currentClass }) {
  const dispatch = useDispatch();
  const [lectureNameField, setLectureNameField] = useState("");
  const [addLectureError, setAddLectureError] = useState(false);
  const [addLectureErrorMessage, setAddLectureErrorMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (lectureNameField === "") {
      setAddLectureError(true);
      setAddLectureErrorMessage("Enter lecture name");
    } else if (file == null) {
      setAddLectureError(true);
      setAddLectureErrorMessage("Upload a file");
    } else {
      // Call API to store file and get its url
      const formData = new FormData();
      formData.append("file", file.data);
      let response = await fetch(`${process.env.REACT_APP_API_URL}/upload/`, {
        method: "POST",
        body: formData,
      });
      const fetchedUrl = await response.json();
      // Call API to get teacherId of current class
      let jsonTeacherId;
      try {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/class/${currentClass}/get_teacher_id`
        );
        jsonTeacherId = await response.json();
      } catch (error) {
        console.error(error.message);
      }
      // Call API to add lecture to DB
      const body = {
        teacherId: jsonTeacherId.teacher_id,
        classId: currentClass,
        lectureName: lectureNameField,
        lectureUrl: fetchedUrl.filename,
      };
      await fetch(`${process.env.REACT_APP_API_URL}/lecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Refresh list of lectures by fetching from API
      try {
        const formattedLectures = [];
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/lecture/${currentClass}`
        );
        const unformattedLectures = await response.json();
        unformattedLectures.map(
          ({
            lecture_id: id,
            class_id: classId,
            teacher_id: teacherId,
            lecture_name: lectureName,
            lecture_url: lectureUrl,
          }) =>
            formattedLectures.push({
              id,
              classId,
              teacherId,
              lectureName,
              lectureUrl,
            })
        );
        await dispatch(loadLectures(formattedLectures));
      } catch (error) {
        console.error(error.message);
      }

      setLectureNameField("");
      setFile(null);
      setAddLectureError(false);
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="add-lecture-name">
          Lecture
          <input
            type="text"
            placeholder="Lecture Name"
            id="class-name"
            value={lectureNameField}
            onChange={(e) => {
              setLectureNameField(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="upload-lecture">
          <input
            className="form-control"
            name="upload"
            type="file"
            onChange={handleFileChange}
          />
          {}
        </label>
      </div>
      {addLectureError && (
        <div className="error-message-2">
          <p>{addLectureErrorMessage}</p>
        </div>
      )}
      <input type="submit" value="Add Lecture" className="btn btn-block" />
    </form>
  );
}
export default AddLecture;

AddLecture.propTypes = {
  currentClass: PropTypes.number.isRequired,
};
