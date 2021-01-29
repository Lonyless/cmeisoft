const express = require('express')  //usado na conexao com a API

class rotasCrianca {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll() {
        this.router.get('/bairro', (req, res) => {
            //query("select * from bairro order by id", res)
        })
    }

    getId() {
        this.router.get('/bairro/:id', (req, res) => {
            //query("select * from bairro where id=" + parseInt(req.params.id), res)
        })
    }

    post() {
        this.router.post('/bairro', (req, res) => {
            const bairro = req.body.nome
            const cidadeId = req.body.cidadeId
           // query(`insert into bairro(nome,cidade_id) values("${bairro}",${cidadeId})`, res)
        })
    }

    put() {
        this.router.put('/bairro/:id', (req, res) => {
            const texto = req.body.nome
            const cidadeId = req.body.cidade_id
          //  query(`update bairro set nome = "${texto}", cidade_id = "${cidadeId}", where id=` + parseInt(req.params.id), res)
        })
    }

    delete() {
        this.router.delete('/bairro/:id', (req, res) => {
         //   query('delete from bairro where id=' + parseInt(req.params.id), res)
        })
    }

}

module.exports = rotasCrianca;