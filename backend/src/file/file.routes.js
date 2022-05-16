const express = require("express");
const multer = require("multer");
require("dotenv").config();

const fileRouter = express.Router();

const fileController = require("./file.controller");

const maxFileUploadSize = process.env.MAX_FILE_UPLOAD_SIZE;

// Configuring Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: maxFileUploadSize },
});

// Routes

fileRouter.get("/download/:file_url", fileController.downloadFile);

fileRouter.post("/upload", upload.single("file"), fileController.uploadFile);

module.exports = fileRouter;
