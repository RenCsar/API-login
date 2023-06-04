const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User");

router.post("/auth/user", async (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  //Check user exists
  const user = await User.findOne({ email: email }, "-password").lean()

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  //Check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const expiresIn = "1h";

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      {
        expiresIn,
      }
    );

    if (!res.headersSent) {
      return res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token, user });
    }
  } catch (error) {
    console.log(error);

    if (!res.headersSent) {
      return res.status(500).json({
        msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }
});

module.exports = router;