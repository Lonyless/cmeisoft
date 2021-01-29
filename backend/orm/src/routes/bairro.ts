import { Bairro } from "../entity/bairro.model";

const express = require('express')  //usado na conexao com a API

class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/bairro', (req, res) => {
            res.send(connection.getRepository(Bairro).find())
        })
    }

    getId(connection) {
        this.router.get('/bairro/:id', (req, res) => {
            res.send(connection.getRepository(Bairro).findOne(parseInt(req.params.id)))
        })
    }

    post(connection) {
        this.router.post('/bairro', (req, res) => {
            const nome = req.body.nome
            const cidadeId = req.body.cidadeId

            const bairro = new Bairro(nome, cidadeId)

            res.send(connection.getRepository(Bairro).save(bairro))

        })
    }

    put(connection) {
        this.router.put('/bairro/:id', (req, res) => {
            const nome = req.body.nome
            const cidadeId = req.body.cidade_id

            const bairro = new Bairro(nome, cidadeId, req.params.id)

            res.send(connection.getRepository(Bairro).save(bairro))
        })
    }

    delete(connection) {
        this.router.delete('/bairro/:id', (req, res) => {

            const bairro = new Bairro(null, null, req.params.id)

            res.send(connection.getRepository(Bairro).remove(bairro))
        })
    }

}

module.exports = rotasCrianca;