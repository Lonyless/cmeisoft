const express = require('express')  //usado na conexao com a API

const query = require('../conection')

class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll() {
        this.router.get('/endereco', (req, res) => {
            query("select * from endereco", res)
        })
    }

    getId() {
        this.router.get('/endereco/:id', (req, res) => {
            query("select * from endereco where id=" + parseInt(req.params.id), res)
        })
    }

    post() {
        this.router.post('/endereco', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.bairro_id
            query(`insert into endereco (rua,numero,bairro_id) values('${rua},${numero},${idBairro}')`, res)
        })
    }

    put() {
        this.router.put('/endereco/:id', (req, res) => {
            const rua = req.body.rua
            const numero = req.body.numero
            const idBairro = req.body.bairro_id
            query(`update posts set endereco="${rua}",numero="${numero}",idBairro="${idBairro}"
             where id=` + parseInt(req.params.id), res)
        })
    }

    delete() {
        this.router.delete('/endereco/:id', (req, res) => {
            query('delete from endereco where id=' + parseInt(req.params.id), res)
        })
    }

}

module.exports = rotasCrianca;