const express = require('express')  //usado na conexao com a API
const bodyParser = require('body-parser') //usado para converter o res para JSON
const mysql = require('mysql') //usado para acessar as querys e o mysql
const cors = require("cors")

const app = express()
const port = 3000  //define a porta padrao
app.set('port', port) //seta a porta

const router = express.Router() //cria o sistema de rotas

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*") //requisições padrao
    res.header("Access-Control-Allow-Headers", "Content-Type") //headers
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE") //metodos
  
    app.use(cors())
    next()
  })

app.use(bodyParser.json())  //muda o html pra JSON
app.use(bodyParser.urlencoded( { extended: false}))

app.use('/', router);

app.listen(port);

console.log('API funcionando!');

//é o diretorio dos arquivos da aplicação
app.use(express.static(__dirname + '/src'));

//rota tabela CMEI

const cmei = require('./routes/cmei')
const crianca = require ('./routes/crianca')
const bairro = require('./routes/bairro')
const cidade = require('./routes/cidade')
const endereco = require('./routes/endereco')
const contemplado = require('./routes/contemplado')
const criterioSocial = require('./routes/criterioSocial')

rotasCmei = new cmei(router)
rotasCrianca = new crianca(router)
rotasBairro = new bairro(router)
rotasCidade = new cidade(router)
rotasEndereco = new endereco(router)
rotasContemplado = new contemplado(router)
rotasCriterioSocial = new criterioSocial(router)

//tabela CMEI
rotasCmei.getAll()
rotasCmei.getId()
rotasCmei.post()
rotasCmei.put()
rotasCmei.delete()

//tabela Crianca
rotasCrianca.getAll()
rotasCrianca.getId()
rotasCrianca.post()
rotasCrianca.put()
rotasCrianca.delete()

//tabela bairro
rotasBairro.getAll()
rotasBairro.getId()
rotasBairro.post()
rotasBairro.put()
rotasBairro.delete()

//tabela cidade
rotasCidade.getAll()
rotasCidade.getId()
rotasCidade.post()
rotasCidade.put()
rotasCidade.delete()

//tabela endereco
rotasEndereco.getAll()
rotasEndereco.getId()
rotasEndereco.post()
rotasEndereco.put()
rotasEndereco.delete()

//tabela contemplado
rotasContemplado.getAll()
rotasContemplado.getId()
rotasContemplado.post()
rotasContemplado.put()
rotasContemplado.delete()

//tabela criterio
rotasCriterioSocial.getAll()
rotasCriterioSocial.getId()
rotasCriterioSocial.post()
rotasCriterioSocial.put()
rotasCriterioSocial.delete()