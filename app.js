require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const publicRoute = require("./routes/publicRoute");
const registerUser = require("./routes/registerUser");
const loginUser = require("./routes/loginUser");
const privateRouter = require("./routes/privateRoute");

const app = express();

const cors = require('cors')
app.use(cors())

//Config JSON response
app.use(express.json()); // Aceitar Json como resposta de requisição

//Open Route - Public Route
app.use("/", publicRoute);

//Register User
app.post("/auth/register", registerUser);

//Login user
app.post("/auth/user", loginUser);

//Private Route
app.get("/user/:id", privateRouter);

//Credenciais
const dbUser = process.env.DB_USER;
const dbPassWord = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassWord}@cluster0.se9wkvs.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco!");
  })
  .catch((err) => console.log(err));