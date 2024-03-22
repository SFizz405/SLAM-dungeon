const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const path = require("path");
const { readPgm, createPgm, getAllPgms } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "pgmsController"
));

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router
  .route("/upload(.html)?")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "upload.html"));
  })
  .post(fileUpload(), createPgm, (req, res) => {
    if (!req.errorMessage) {
      res.redirect("/view");
    } else {
      res.send(req.errorMessage);
    }
  });

router.get("/view(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "view.html"));
});

router.get("/iframe(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "iframe.html"));
});

router.post("/readPgm", fileUpload(), readPgm, (req, res) => {
  if (!req.errorMessage) {
    res.send(req.pgmData);
  } else {
    res.send({ error: req.errorMessage });
  }
});

router.get("/getAllPgms", async (req, res) => {
  res.send(await getAllPgms());
});

module.exports = router;
