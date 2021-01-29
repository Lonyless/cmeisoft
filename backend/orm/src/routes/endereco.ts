import { Endereco } from "../entity/endereco.model";

const express = require('express')  //usado na conexao com a API


class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/endereco', (req, res) => {
            res.send(connection.getRepository(Endereco).find())
        })
    }

    getId(connection) {
        this.router.get('/endereco/:id', (req, res) => {
            res.send(connection.getRepository(Endereco).findOne(req.params.id))

        })
    }

    post(connection) {

        this.router.post('/endereco', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.idBairro

            const endereco = new Endereco(null, rua, numero, idBairro)

            res.send(connection.getRepository(Endereco).save(endereco))

        })
    }

    put(connection) {
        this.router.put('/endereco/:id', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.idBairro

            const endereco = new Endereco(req.params.id, rua, numero, idBairro)

            res.send(connection.getRepository(Endereco).save(endereco))
        })
    }

    delete(connection) {
        this.router.delete('/endereco/:id', (req, res) => {
            const endereco = new Endereco(req.params.id, null, null, null)

            res.send(connection.getRespository(Endereco).remove(endereco))
        })
    }

}

module.exports = rotasCrianca;