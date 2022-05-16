const express = require("express");

const lectureRouter = express.Router();

const lectureController = require("./lecture.controller");

lectureRouter.post("/lecture", lectureController.addLecture);

lectureRouter.get("/lecture/:class_id", lectureController.getLecturesFromClass);

lectureRouter.get(
  "/lecture/get_lecture_url/:id",
  lectureController.getLectureUrl
);

lectureRouter.delete("/lecture/:id", lectureController.deleteLecture);

module.exports = lectureRouter;
