exports.downloadFile = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { file_url } = req.params;
    // eslint-disable-next-line camelcase
    res.download(`uploads/${file_url}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { filename } = await req.file;
    res.send({ filename });
  } catch (error) {
    res.status(500).json(error);
  }
};
