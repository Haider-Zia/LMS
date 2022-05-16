const pool = require("../../db");

exports.getClasses = async () => {
  try {
    const allClasses = await pool.query(
      "SELECT class_id, teacher_email, class_name FROM class"
    );
    return allClasses.rows;
  } catch (error) {
    throw Error("Error getting classes");
  }
};

exports.addClass = async (teacherId, teacherEmail, className) => {
  try {
    const newClass = await pool.query(
      "INSERT INTO class (teacher_id, teacher_email, class_name) VALUES($1, $2, $3) RETURNING *",
      [teacherId, teacherEmail, className]
    );
    return newClass.rows[0];
  } catch (error) {
    throw Error("Error adding class");
  }
};

// eslint-disable-next-line camelcase
exports.getTeacherIdFromClass = async (c_id) => {
  try {
    const teacherId = await pool.query(
      "SELECT teacher_id FROM class WHERE class_id=($1)",
      // eslint-disable-next-line camelcase
      [c_id]
    );
    return teacherId.rows[0];
  } catch (error) {
    throw Error("Error getting teacher for class");
  }
};

exports.deleteClass = async (id) => {
  try {
    await pool.query("DELETE FROM class WHERE class_id=($1)", [id]);
  } catch (error) {
    throw Error("Error deleting class");
  }
};
