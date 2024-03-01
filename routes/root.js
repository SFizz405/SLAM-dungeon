const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/upload(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "upload.html"));
});

router.get("/view(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "view.html"));
});

module.exports = router;
