exports.downloadFile = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { file_url } = req.params;
  // eslint-disable-next-line camelcase
  res.download(`uploads/${file_url}`);
};

exports.uploadFile = async (req, res) => {
  const { filename } = await req.file;
  res.send({ filename });
};
