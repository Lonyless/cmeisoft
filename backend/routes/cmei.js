const express = require('express')  //usado na conexao com a API

const query = require('../conection')

class rotasCmei {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll() {
        this.router.get('/cmei', (req, res) => {
            query("select * from cmei order by id", res)
        })
    }

    getId() {
        this.router.get('/cmei/:id', (req, res) => {
            query("select * from cmei where id=" + parseInt(req.params.id), res)
        })
    }

    post() {
        this.router.post('/cmei', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco

            query(`insert into cmei(nome,telefone,id_endereco,status)
            values("${nome}",${telefone},${idEndereco},1)`, res)
        })
    }

    put() {
        this.router.put('/cmei/:id', (req, res) => {
            const nome = req.body.nome
            const telefone = req.body.telefone
            const idEndereco = req.body.idEndereco
            const status = req.body.status
            query(`update cmei set nome="${nome}", telefone="${telefone}",id_endereco="${idEndereco}",
            status="${status}" where id=` + parseInt(req.params.id), res)
        })
    }

    delete() {
        this.router.delete('/cmei/:id', (req, res) => {
            query('delete from cmei where id=' + parseInt(req.params.id), res)
        })
    }

}

module.exports = rotasCmei;