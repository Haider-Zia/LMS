const classService = require("./class.service");

exports.getClasses = async (req, res) => {
  try {
    const allClasses = await classService.getClasses();
    res.json(allClasses);
  } catch (error) {
    res.json(error.message);
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
    res.json(error.message);
  }
};

exports.getTeacherIdFromClass = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { c_id } = req.params;
    const teacherId = await classService.getTeacherIdFromClass(c_id);
    res.json(teacherId);
  } catch (error) {
    res.json(error.message);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await classService.deleteClass(id);
    res.json("Class was deleted");
  } catch (error) {
    res.json(error.message);
  }
};
