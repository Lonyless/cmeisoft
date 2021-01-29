import { Bairro } from "../entity/bairro.model";

const express = require('express')  //usado na conexao com a API

class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/bairro', (req, res) => {
            connection.getRepository(Bairro).find().then(result => {res.json(result)})
        })
    }

    getId(connection) {
        this.router.get('/bairro/:id', (req, res) => {
            connection.getRepository(Bairro).findOne(parseInt(req.params.id)).then(result => {res.json(result)})
        })
    }

    post(connection) {
        this.router.post('/bairro', (req, res) => {
            const nome = req.body.nome
            const cidadeId = req.body.cidadeId

            const bairro = new Bairro(nome, cidadeId)

            connection.getRepository(Bairro).save(bairro).then(result => {res.json(result)})

        })
    }

    put(connection) {
        this.router.put('/bairro/:id', (req, res) => {
            const nome = req.body.nome
            const cidadeId = req.body.cidade_id

            const bairro = new Bairro(nome, cidadeId, req.params.id)

            connection.getRepository(Bairro).save(bairro).then(result => {res.json(result)})
        })
    }

    delete(connection) {
        this.router.delete('/bairro/:id', (req, res) => {

            const bairro = new Bairro(null, null, req.params.id)

            connection.getRepository(Bairro).remove(bairro).then(result => {res.json(result)})
        })
    }

}

module.exports = rotasCrianca;