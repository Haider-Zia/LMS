import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddLecture from "./addLecture";
import Lecture from "./lecture";
import { loadLectures } from "./lecturesSlice";

function Lectures() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInAsAdmin = useSelector(
    (state) => state.loginAndSignup.loggedInAsAdmin
  );
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  const currentEmail = useSelector(
    (state) => state.loginAndSignup.currentEmail
  );
  const classes = useSelector((state) => state.classes.classes);
  const lectures = useSelector((state) => state.lectures.lectures);

  const loadLecturesFunction = async () => {
    try {
      const formattedData = [];
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/lecture/${parseInt(params.id, 10)}`
      );
      const jsonData = await response.json();
      jsonData.map(
        ({
          lecture_id: id,
          class_id: classId,
          teacher_id: teacherId,
          lecture_name: lectureName,
          lecture_url: lectureUrl,
        }) =>
          formattedData.push({
            id,
            classId,
            teacherId,
            lectureName,
            lectureUrl,
          })
      );
      await dispatch(loadLectures(formattedData));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    // must be logged in to access this page

    if (currentEmail === "") {
      navigate("/login");
    }

    // if currently logged in as teacher, check if this class belongs to the teacher
    if (loggedInAsTeacher) {
      const teacherClasses = classes.filter(
        (classIterator) => classIterator.teacherEmail === currentEmail
      );
      if (
        teacherClasses.filter(
          (classIterator) => classIterator.id === parseInt(params.id, 10)
        ).length === 0
      ) {
        navigate("/teacherDashboard");
      }
    }

    // admins can't view lessons for class, they don't need to
    if (loggedInAsAdmin) {
      navigate("/adminDashboard");
    }

    loadLecturesFunction();
  }, []);
  return (
    <div>
      {loggedInAsTeacher && (
        <AddLecture currentClass={parseInt(params.id, 10)} />
      )}
      {lectures.map((lecturesIterator) => (
        <Lecture key={lecturesIterator.id} id={lecturesIterator.id} />
      ))}
    </div>
  );
}

export default Lectures;
