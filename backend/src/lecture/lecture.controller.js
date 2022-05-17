const lectureService = require("./lecture.service");

exports.addLecture = async (req, res) => {
  try {
    const { teacherId, classId, lectureName, lectureUrl } = req.body;
    const newLecture = await lectureService.addLecture(
      teacherId,
      classId,
      lectureName,
      lectureUrl
    );
    res.json(newLecture);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLecturesFromClass = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { class_id } = req.params;
    const lectures = await lectureService.getLecturesFromClass(class_id);
    res.json(lectures);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLectureUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const lectureUrl = await lectureService.getLectureUrl(id);
    res.json(lectureUrl);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    await lectureService.deleteLecture(id);
    res.json("Lecture was deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
