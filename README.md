<h1 align="center">
 <img align="center" width="150" height="150" src="https://i.imgur.com/gSMO1oq.png"><br>
 Tech Talents</a>
</h1>

<p align="center">
 <a href="#Descrição">Descrição</a> •
 <a href="#Tecnologias">Tech Talents</a> •
 <a href="#instalacao">Instalação e Uso</a> •
 <a href="#estrutura">Estrutura do Projeto</a> •
 <a href="#autor">Autor</a>
</p>

---

<!-- <br>

<h1 align="center">  
  <p align="center">
  <img width="800" height="400" src="public/login.gif"><br><br>
</p> -->

</h1>

<a id="Descrição"></a>
### Descrição

Este é um pequeno projeto desenvolvido com a Stack MERN (React.js, TypeScript, Node.js, Express e MongoDB). O objetivo principal é implementar um sistema de login seguro, onde os usuários podem autenticar-se através de tokens gerados pelo JSON Web Tokens (JWT).

O back-end deste projeto foi desenvolvido utilizando Node.js e Express, e utiliza o MongoDB como banco de dados. Nesta aplicação, implementamos uma arquitetura de endpoints, com rotas públicas e privadas.

Os endpoints públicos podem ser acessados sem a necessidade de autenticação. Porém, para acessar os endpoints privados, é necessário ter um token de autenticação válido. É importante destacar que, atualmente, os endpoints privados não estão sendo utilizados na aplicação frontend, mas estão disponíveis para futuras implementações ou integrações com outras aplicações.

O token de autenticação é entregue após um login bem-sucedido e deve ser enviado pelo cabeçalho (header) das requisições de endpoints privados. Utilizamos um middleware para validar se o token é válido ou não, garantindo assim a segurança das rotas privadas.

Este backend foi construído com foco na segurança e na autenticação dos usuários, utilizando tokens JWT (JSON Web Tokens). A estrutura do código foi organizada de forma modular e seguindo as melhores práticas de desenvolvimento.

Este repositório contém o back-end da aplicação. O front-end pode ser encontrado [Aqui](https://github.com/RenCsar/login)!

<a id="Tecnologias"></a>
### Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Mongoose](https://mongoosejs.com/)

---

<a id="instalacao"></a>
## Pré-requisitos

- Node.js (versão ^18.16)
- npm (versão ^8.12.2)

## Configuração do Ambiente

1. Clone o repositório:

   ```shell
   git clone https://github.com/RenCsar/API-login.git
   ```

2. Instale as dependências:

   ```shell
   npm install
   ```

## Rodando o Projeto

1. Inicie o servidor de desenvolvimento (nodemon):

   ```shell
   npm run dev
   ```

   O servidor será iniciado em http://localhost:3000.

<a id="estrutura"></a>
## Estrutura do Projeto

Explicação da estrutura de pastas do projeto:

```
src/
  models/           # Modelo
  routes/           # Routas da aplicação
```

### Autor

Made with 💜 by Renan Cesar 👋

[![LinkedIn Badge](https://img.shields.io/badge/-Renan_Cesar-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-cesar/)](https://www.linkedin.com/in/renan-cesar/)
