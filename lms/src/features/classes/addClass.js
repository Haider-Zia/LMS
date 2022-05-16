import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { loadClasses } from "./classesSlice";

function AddClass() {
  const dispatch = useDispatch();
  const [classNameField, setClassNameField] = useState("");
  const [teacherEmailValueLabelPair, setTeacherEmailValueLabelPair] =
    useState("");
  const [addClassError, setAddClassError] = useState(false);
  const [addClassErrorMessage, setAddClassErrorMessage] = useState("");

  let teachers = useSelector((state) => state.loginAndSignup.accounts);
  teachers = teachers.filter((teacher) => teacher.type === "teacher");
  const teacherEmailsList = teachers.map((teacher) => teacher.email);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (classNameField === "") {
      setAddClassError(true);
      setAddClassErrorMessage("Enter class name");
    } else if (teacherEmailValueLabelPair === "") {
      setAddClassError(true);
      setAddClassErrorMessage("Choose a teacher");
    } else {
      // Call API to add class to DB
      let jsonData;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/person/${teacherEmailValueLabelPair.value}/get_person_id`
        );
        jsonData = await response.json();
      } catch (error) {
        console.error(error.message);
      }
      const body = {
        teacherId: jsonData.person_id,
        teacherEmail: teacherEmailValueLabelPair.value,
        className: classNameField,
      };
      await fetch(`${process.env.REACT_APP_API_URL}/class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Refresh list of classes by fetching from API
      try {
        const formattedData = [];
        const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
        jsonData = await response.json();
        jsonData.map(
          ({
            class_id: id,
            teacher_email: teacherEmail,
            class_name: className,
          }) => formattedData.push({ id, className, teacherEmail })
        );
        await dispatch(loadClasses(formattedData));
      } catch (error) {
        console.error(error.message);
      }

      setClassNameField("");
      setTeacherEmailValueLabelPair("");
      setAddClassError(false);
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="add-class-name">
          Class
          <input
            type="text"
            placeholder="Class Name"
            id="class-name"
            value={classNameField}
            onChange={(e) => {
              setClassNameField(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="add-teacher">
          Teacher
          <Select
            options={teacherEmailsList.map((t) => ({ value: t, label: t }))}
            value={teacherEmailValueLabelPair}
            onChange={setTeacherEmailValueLabelPair}
          />
          {}
        </label>
      </div>
      {addClassError && (
        <div className="error-message-2">
          <p>{addClassErrorMessage}</p>
        </div>
      )}
      <input type="submit" value="Add Class" className="btn btn-block" />
    </form>
  );
}

export default AddClass;
