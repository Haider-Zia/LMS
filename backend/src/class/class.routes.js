const express = require("express");

const classRouter = express.Router();

const classController = require("./class.controller");

classRouter
  .route("/class")
  .get(classController.getClasses)
  .post(classController.addClass);

classRouter.delete("/class/:id", classController.deleteClass);

classRouter.get(
  "/class/:c_id/get_teacher_id",
  classController.getTeacherIdFromClass
);

module.exports = classRouter;
