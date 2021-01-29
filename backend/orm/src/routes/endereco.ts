import { Endereco } from "../entity/endereco.model";

const express = require('express')  //usado na conexao com a API


class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/endereco', (req, res) => {
            connection.getRepository(Endereco).find().then(result => { res.json(result) })
        })
    }

    getId(connection) {
        this.router.get('/endereco/:id', (req, res) => {
            connection.getRepository(Endereco).findOne(req.params.id).then(result => { res.json(result) })
        })
    }

    post(connection) {

        this.router.post('/endereco', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.idBairro

            const endereco = new Endereco(null, rua, numero, idBairro)

            connection.getRepository(Endereco).save(endereco).then(result => { res.json(result) })

        })
    }

    put(connection) {
        this.router.put('/endereco/:id', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.idBairro

            const endereco = new Endereco(req.params.id, rua, numero, idBairro)

            connection.getRepository(Endereco).save(endereco).then(result => { res.json(result) })
        })
    }

    delete(connection) {
        this.router.delete('/endereco/:id', (req, res) => {
            const endereco = new Endereco(req.params.id, null, null, null)

            connection.getRespository(Endereco).remove(endereco).then(result => {res.json(result)})
        })
    }

}

module.exports = rotasCrianca;