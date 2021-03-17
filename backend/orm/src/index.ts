import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection().then(async connection => {

    const express = require('express')  //usado na conexao com a API
    const bodyParser = require('body-parser') //usado para converter o res para JSON
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
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use('/', router);

    app.listen(port);

    console.log('API funcionando!');

    const cmei = require('./routes/cmei')
    const crianca = require('./routes/crianca')
    const bairro = require('./routes/bairro')
    const cidade = require('./routes/cidade')
    const endereco = require('./routes/endereco')
    const contemplado = require('./routes/contemplado')
    const criterioSocial = require('./routes/criterioSocial')
    const responsavel = require('./routes/responsavel')

    const rotasCmei = new cmei(router)
    const rotasCrianca = new crianca(router)
    const rotasBairro = new bairro(router)
    const rotasCidade = new cidade(router)
    const rotasEndereco = new endereco(router)
    const rotasContemplado = new contemplado(router)
    const rotasCriterioSocial = new criterioSocial(router)
    const rotasResponsavel = new responsavel(router)

    //tabela CMEI
    rotasCmei.getAll(connection)
    rotasCmei.getId(connection)
    rotasCmei.post(connection)
    rotasCmei.put(connection)
    rotasCmei.delete(connection)

    //tabela Crianca
    rotasCrianca.getAll(connection)
    rotasCrianca.getId(connection)
    rotasCrianca.post(connection)
    rotasCrianca.put(connection)
    rotasCrianca.delete(connection)

    //tabela bairro
    rotasBairro.getAll(connection)
    rotasBairro.getId(connection)
    rotasBairro.post(connection)
    rotasBairro.put(connection)
    rotasBairro.delete(connection)

    //tabela cidade
    rotasCidade.getAll(connection)
    rotasCidade.getId(connection)
    rotasCidade.post(connection)
    rotasCidade.put(connection)
    rotasCidade.delete(connection)

    //tabela endereco
    rotasEndereco.getAll(connection)
    rotasEndereco.getId(connection)
    rotasEndereco.post(connection)
    rotasEndereco.put(connection)
    rotasEndereco.delete(connection)

    //tabela criterio
    rotasCriterioSocial.getAll(connection)
    rotasCriterioSocial.getId(connection)
    rotasCriterioSocial.post(connection)
    rotasCriterioSocial.put(connection)
    rotasCriterioSocial.delete(connection)
    
    //tabela responsavel
    rotasResponsavel.getAll(connection)
    rotasResponsavel.getId(connection)
    rotasResponsavel.post(connection)
    rotasResponsavel.put(connection)
    rotasResponsavel.delete(connection)

}).catch(error => console.log(error));
