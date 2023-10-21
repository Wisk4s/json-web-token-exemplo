// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const crypto = require('./crypto')

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/", "/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
    res.render('home');
});

app.post('/usuarios/cadastrar', async function (req, res){

  if( req.body.senha == req.body.csenha){
    let cryptar = req.body
    cryptar.senha = crypto.encrypt(req.body.senha)

    await usuario.create(cryptar);
    res.redirect("/usuarios/listar")

     } else{
      res.status(500).json({mensagem: "Não foi possível cadastrar"})
     }
  })

  app.get('/usuarios/listar', async function(req, res){
    try{
      const list = await usuario.findAll();
      res.render('listar', {list})
      
    }catch(error){
      console.error(error);
      res.status(500).send("Erro ao listar")
    }
     })

app.post('/logar', async (req, res) => {
  const registra = await usuario.findOne ({ where: {nome: req.body.nome, senha: crypto.encrypt(req.body.senha)}});

  if (registra){
    const id = registra.id;
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 300 });
    res.cookie('token', token, { httpOnly: true })
    return res.redirect('/')
  }
  res.status(500).json({mensagem: "Login Inválido"})
});

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, { httpOnly: true});
  res.json({
    deslogado: true
  })
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});