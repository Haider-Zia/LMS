import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteClass } from "./classesSlice";

function Class({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const loggedInAsAdmin = useSelector(
    (state) => state.loginAndSignup.loggedInAsAdmin
  );
  const loggedInAsTeacher = useSelector(
    (state) => state.loginAndSignup.loggedInAsTeacher
  );
  const currentClass = classes.find(
    (classesIterator) => classesIterator.id === id
  );

  const deleteClassFunction = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
    dispatch(deleteClass(id));
  };
  return (
    <div
      aria-hidden="true"
      className="task"
      onClick={() =>
        !loggedInAsAdmin && navigate(`/class/${currentClass.id}/lectures`)
      }
    >
      <h3>
        {currentClass.className} {}
        {loggedInAsAdmin && (
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={deleteClassFunction}
          />
        )}
      </h3>
      {!loggedInAsTeacher && <p>{currentClass.teacherEmail}</p>}
    </div>
  );
}

export default Class;

Class.propTypes = {
  id: PropTypes.number.isRequired,
};
