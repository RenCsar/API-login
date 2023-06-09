const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User");

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    // Chack if token is valid
    jwt.verify(token, secret);

    // The token is valid, next step
    next();
  } catch (error) {
    // The token is invalid or expired
    return res.status(401).json({ msg: "Token inválido!" });
  }
};

router.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID de usuário inválido" });
  }

  try {
    //Check if use Exist
    const user = await User.findById(id, "-password").lean();

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    if (user && Object.keys(user).length > 0) {
      res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

module.exports = router;