const path = require("path");
const { readPgmSync } = require("node-pgm");
const Pgm = require(path.join(__dirname, "..", "model", "pgm"));

const readPgm = (req, res, next) => {
  try {
    req.pgmData = readPgmSync(req.files.pgm.data);
  } catch (err) {
    req.errorMessage = err.message;
  }

  next();
};

const createPgm = async (req, res, next) => {
  try {
    const fileData = readPgmSync(req.files.pgm.data);

    fileData.data = fileData.data.toString("base64");

    await Pgm.create({
      name: req.body.name,
      description: req.body.description,
      data: fileData,
    });
  } catch (err) {
    req.errorMessage = err.message;
  }

  next();
};

const getAllPgms = async (req, res) => {
  const allPgms = await Pgm.find({});

  return allPgms.map(
    (obj) => ((obj.data.data = Buffer.from(obj.data.data, "base64")), obj)
  );
};

module.exports = { readPgm, createPgm, getAllPgms };
