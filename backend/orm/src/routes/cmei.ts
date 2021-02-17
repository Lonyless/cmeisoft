import express = require('express');  //usado na conexao com a API

import { Cmei } from '../entity/cmei.model'

class rotasCmei {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll(connection) {
        this.router.get('/cmei', (req, res) => {
            connection.getRepository(Cmei).find().then(result => { res.json(result) })
        })
    }

    getId(connection) {
        this.router.get('/cmei/:id', (req, res) => {
            connection.getRepository(Cmei).findOne(parseInt(req.params.id)).then(result => { res.json(result) })
        })
    }

    post(connection) {
        this.router.post('/cmei', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco

            const cmei = new Cmei(nome, telefone, idEndereco, 1)

            connection.getRepository(Cmei).save(cmei).then(result => { res.json(result) })

        })
    }

    put(connection) {
        this.router.put('/cmei/:id', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco
            const status = req.body.status

            const cmei = new Cmei(nome, telefone, idEndereco, status, req.params.id)

            connection.getRepository(Cmei).save(cmei).then(result => { res.json(result) })

        })
    }

    delete(connection) {
        this.router.delete('/cmei/:id', (req, res) => {

            const cmei = new Cmei(null, null, null, null, req.params.id)

            connection.getRepository(Cmei).remove(cmei).then(result => {res.json(result)})

        })
    }

}

module.exports = rotasCmei;