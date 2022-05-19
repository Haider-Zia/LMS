// const pool = require("../../db");

const { Lecture } = require("../../models");

exports.addLecture = async (teacherId, classId, lectureName, lectureUrl) => {
  try {
    /*
    const newLecture = await pool.query(
      "INSERT INTO lecture (teacher_id, class_id, lecture_name, lecture_url) VALUES($1, $2, $3, $4) RETURNING *",
      [teacherId, classId, lectureName, lectureUrl]
    );
    return newLecture.rows[0];
    */
    const newLecture = await Lecture.create({
      teacher_id: teacherId,
      class_id: classId,
      lecture_name: lectureName,
      lecture_url: lectureUrl,
    });
    return newLecture;
  } catch (error) {
    throw Error("Error adding lecture");
  }
};

// eslint-disable-next-line camelcase
exports.getLecturesFromClass = async (class_id) => {
  try {
    /*
    const lectures = await pool.query(
      "SELECT * FROM lecture WHERE class_id=($1)",
      // eslint-disable-next-line camelcase
      [class_id]
    );
    return lectures.rows;
    */
    const allLecturesFromClass = await Lecture.findAll({
      // eslint-disable-next-line camelcase
      where: { class_id },
    });
    return allLecturesFromClass;
  } catch (error) {
    throw Error("Error getting lectures");
  }
};

exports.getLectureUrl = async (id) => {
  try {
    /*
    const lectureUrl = await pool.query(
      "SELECT lecture_url FROM lecture WHERE lecture_id=($1)",
      [id]
    );
    return lectureUrl.rows[0];
    */
    const foundLecture = await Lecture.findOne({
      where: { lecture_id: id },
    });
    return foundLecture.lecture_url;
  } catch (error) {
    throw Error("Error getting lecture URL");
  }
};

exports.deleteLecture = async (id) => {
  try {
    // await pool.query("DELETE FROM lecture WHERE lecture_id=($1)", [id]);
    const foundLecture = await Lecture.findOne({
      where: { lecture_id: id },
    });
    foundLecture.destroy();
  } catch (error) {
    throw Error("Error deleting lecture");
  }
};
