const express = require("express");
const cors = require("cors");
const multer = require("multer");
const logger = require("./logger");

require("dotenv").config();

const personRouter = require("./src/person/person.routes");
const classRouter = require("./src/class/class.routes");
const lectureRouter = require("./src/lecture/lecture.routes");

const host = process.env.HOST;
const port = process.env.PORT;
const maxFileUploadSize = process.env.MAX_FILE_UPLOAD_SIZE;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Multer upload File
app.post("/upload", upload.single("file"), (req, res) => {
  // Omnly class should kbe with caps
  const FileName = req.file.filename;
  res.send({ filename: FileName });
});

// Download file
app.get("/download/:file_url", (req, res) => {
  // eslint-disable-next-line camelcase
  const { file_url } = req.params;
  // eslint-disable-next-line camelcase
  res.download(`uploads/${file_url}`);
});

//
app.use(personRouter);
app.use(classRouter);
app.use(lectureRouter);
app.listen(port, host, () => {
  // console.log(`Server started on ${host}:${port}`);
  logger.info(`Server started on ${host}:${port}`);
});
