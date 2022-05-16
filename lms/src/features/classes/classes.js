import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Class from "./class";
import { loadClasses } from "./classesSlice";

function Classes() {
  // Check if logged in as teacher, check the teacher's email, and load classes according to email.
  // If logged in as Student or Admin, load all classes.
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  const currentEmail = useSelector(
    (state) => state.loginAndSignup.currentEmail
  );

  let classes = useSelector((state) => state.classes.classes);
  if (loggedInAsTeacher) {
    classes = classes.filter(
      (classesIterator) => classesIterator.teacherEmail === currentEmail
    );
  }

  const dispatch = useDispatch();

  // API call to initialize store
  const getClasses = async () => {
    try {
      const formattedData = [];
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
      const jsonData = await response.json();
      jsonData.map(
        ({
          class_id: id,
          teacher_email: teacherEmail,
          class_name: className,
        }) => formattedData.push({ id, className, teacherEmail })
      );
      dispatch(loadClasses(formattedData));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);
  return (
    <>
      {classes.map((classesIterator) => (
        <Class key={classesIterator.id} id={classesIterator.id} />
      ))}
    </>
  );
}

export default Classes;
