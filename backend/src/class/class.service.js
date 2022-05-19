// const pool = require("../../db");

const { Class } = require("../../models");

exports.getClasses = async () => {
  try {
    /*
    const allClasses = await pool.query(
      "SELECT class_id, teacher_email, class_name FROM class"
    );
    return allClasses.rows;
    */
    const allClasses = await Class.findAll();
    return allClasses;
  } catch (error) {
    throw Error("Error getting classes");
  }
};

exports.addClass = async (teacherId, teacherEmail, className) => {
  try {
    /*
    const newClass = await pool.query(
      "INSERT INTO class (teacher_id, teacher_email, class_name) VALUES($1, $2, $3) RETURNING *",
      [teacherId, teacherEmail, className]
    );
    return newClass.rows[0];
    */
    const newClass = await Class.create({
      teacher_id: teacherId,
      teacher_email: teacherEmail,
      class_name: className,
    });
    return newClass;
  } catch (error) {
    throw Error("Error adding class");
  }
};

// eslint-disable-next-line camelcase
exports.getTeacherIdFromClass = async (c_id) => {
  try {
    /*
    const teacherId = await pool.query(
      "SELECT teacher_id FROM class WHERE class_id=($1)",
      // eslint-disable-next-line camelcase
      [c_id]
    );
    return teacherId.rows[0];
    */
    // eslint-disable-next-line camelcase
    const foundClass = await Class.findOne({ where: { class_id: c_id } });
    return foundClass.teacher_id;
  } catch (error) {
    throw Error("Error getting teacher for class");
  }
};

exports.deleteClass = async (id) => {
  try {
    // await pool.query("DELETE FROM class WHERE class_id=($1)", [id]);
    const foundClass = await Class.findOne({ where: { class_id: id } });
    foundClass.destroy();
  } catch (error) {
    throw Error("Error deleting class");
  }
};
