const express = require("express");
const router = express.Router();

//Open Route - Public Route
router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo a nossa API!" });
});

module.exports = router;