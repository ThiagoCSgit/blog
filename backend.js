const http = require("http");
const path = require("path");

const express = require("express");
const fs = require("fs");
var session = require("express-session");
const { application } = require("express");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: "abc" }));

// configuraçoes
app.set("port", process.env.PORT || 3000);

// secção de login
app.use("/public/acesso-restrito/*", (req, res, next) => {
  if (req.session.nome) {
    next();
  } else {
    res.redirect("/");
  }
});

// secção de criação de usuários
app.use("/registro", (req, res, next) => {
  if (req.session.nome) {
    next();
  } else {
    res.redirect("/");
  }
});

// artigos estaticos
app.use(express.static(__dirname));

//start do server
server.listen(app.get("port"), () => {
  console.log("server na porta", app.get("port"));
});

// secção de login 2
let usuarioLogado = ''

app.post("/login", (req, res) => {
  const usuarioscad = fs.readFileSync("./users.json");
  const usuariosparse = JSON.parse(usuarioscad);
  var nome = req.body.nomes;
  var senha = req.body.senha;
  usuarioLogado = nome
  for (var umUsuario of usuariosparse) {
    if (nome == umUsuario.nome && senha == umUsuario.senha) {
      req.session.nome = umUsuario;
      res.send("conectado");
      setTimeout(() => {
        
      }, 1000)
      return;
    }
  }
  res.send("falhou");
});

app.post("/cadastro", (req, res) => {
  const usuarioscad = JSON.parse(fs.readFileSync("./users.json"));

  const newUser = {
    nome: req.body.nome,
    senha: req.body.senha
  }
  usuarioscad.push(newUser)
  console.log('newUser:',newUser)
  fs.writeFileSync("./users.json", JSON.stringify(usuarioscad))
  req.session.nome = newUser;
  res.send('conectado')
})

app.post("/post", (req, res) => {
  const usuarioscad = JSON.parse(fs.readFileSync("./users.json"));

  const newPost = {
    post: req.body.userPost
  }
  usuarioscad.map(item => {
    console.log('item:',item)
    if(item.nome == usuarioLogado){
      console.log('user:',item.post)
      item.post.push(newPost)
    }
  })
  fs.writeFileSync("./users.json", JSON.stringify(usuarioscad))
  req.session.nome = newPost;
  res.send('conectado')
})

app.post("/getPosts", (req, res) => {
  const usuarioscad = JSON.parse(fs.readFileSync("./users.json"));
  usuarioscad.map(item => {
    if(item.nome == usuarioLogado){
      return res.status(200).send(item.post)
    }
  })
})

app.post("/deletePost", (req, res) => {
  const usuarioscad = JSON.parse(fs.readFileSync("./users.json"));
  console.log('usuarioLogado:',usuarioLogado)
  usuarioscad.map((item, pos) => {
    let index = req.body.posPost
    if(item.nome == usuarioLogado){
      usuarioscad[pos].post.splice(index, 1)
      fs.writeFileSync("./users.json", JSON.stringify(usuarioscad))
      return res.status(200).send(item.post)
    }
  })
})