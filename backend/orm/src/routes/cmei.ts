const express = require('express')  //usado na conexao com a API

import { Cmei } from '../entity/cmei.model'


class rotasCmei {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/cmei', (req, res) => {

            res.send(connection.getRepository(Cmei).find())

        })
    }

    getId(connection) {
        this.router.get('/cmei/:id', (req, res) => {
            res.send(connection.getRepository(Cmei).findOne(parseInt(req.params.id)))
        })
    }

    post(connection) {
        this.router.post('/cmei', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco

            const cmei = new Cmei(nome, telefone, idEndereco, 1)

            res.send(connection.getRepository(Cmei).save(cmei))

        })
    }

    put(connection) {
        this.router.put('/cmei/:id', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco
            const status = req.body.status

            const cmei = new Cmei(nome, telefone, idEndereco, status, req.params.id)

            res.send(connection.getRepository(Cmei).save(cmei))

        })
    }

    delete(connection) {
        this.router.delete('/cmei/:id', (req, res) => {

            const cmei = new Cmei(null, null, null, null, req.params.id)

            res.send(connection.getRepository(Cmei).remove(cmei))

        })
    }

}

module.exports = rotasCmei;