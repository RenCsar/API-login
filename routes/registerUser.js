const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Models
const User = require("../models/User");

//Register User
router.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  //Validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }
  if (!email.includes("@")) {
    return res.status(422).json({ msg: `Digite um e-mail válido!` });
  }

  //Convert email to lowercase
  const lowercaseEmail = email.toLowerCase()

  //Check if user exists
  const userExists = await User.findOne({ email: lowercaseEmail });

  if (userExists) {
    return res
      .status(422)
      .json({ msg: "E-mail já cadastrado, por favor digite outro e-mail!" });
  }

  //Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //Create user
  const user = new User({
    name,
    email: lowercaseEmail,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!", data: user });
  } catch (error) {
    res.status(500).json({
      msg: `Ocorreu um erro no servidor, tente novamente mais tarde!`,
    });
    console.log(error);
  }
});

module.exports = router;