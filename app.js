require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

//Config JSON response
app.use(express.json()) // Aceitar Json como resposta de requisição

//Models
const User = require('./models/User')

//Open Route - Public Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo a nossa API!" });
});

//Register User
app.post('/auth/register', async(req, res)=> {
    const {name, email, password, confirmPassword} = req.body

    //Validations
    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }
    if(password !== confirmPassword) {
        return res.status(422).json({msg: 'As senhas não conferem!'})
    }
    if(!email.includes("@")){        
        return res.status(422).json({msg: `Digite um e-mail válido!`})
    }

    //Check if user exists
    const userExists = await User.findOne({ email: email })

    if(userExists){
        return res.status(422).json({msg: 'E-mail já cadastrado, por favor digite outro e-mail!'})
    }

    //Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try{

        await user.save()
        res.status(201).json({msg: 'Usuário criado com sucesso!', data: user})

    } catch(error){
        res.status(500).json({msg: `Ocorreu um erro no servidor, tente novamente mais tarde!`})
        console.log(error)
    }

    // res.status(200).json({msg: 'Tudo Certo!'})
})

//Credenciais
const dbUser = process.env.DB_USER
const dbPassWord = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassWord}@cluster0.se9wkvs.mongodb.net/?retryWrites=true&w=majority`).then(()=> {
    app.listen(3000);
    console.log('Conectou ao banco!')
}).catch((err)=> console.log(err))