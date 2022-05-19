const classService = require("./class.service");

exports.getClasses = async (req, res) => {
  try {
    const allClasses = await classService.getClasses();
    res.json(allClasses);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addClass = async (req, res) => {
  try {
    const { teacherId, teacherEmail, className } = req.body;
    const newClass = await classService.addClass(
      teacherId,
      teacherEmail,
      className
    );
    res.json(newClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTeacherIdFromClass = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { c_id } = req.params;
    const teacherId = await classService.getTeacherIdFromClass(c_id);
    res.json(teacherId);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await classService.deleteClass(id);
    res.json("Class was deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
