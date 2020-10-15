const express = require('express')  //usado na conexao com a API

const query = require('../conection')

class rotasCmei {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll() {
        this.router.get('/responsavel', (req, res) => {
            query("select * from responsavel", res)
        })
    }

    getId() {
        this.router.get('/responsavel/:id', (req, res) => {
            query("select * from responsavel where id=" + parseInt(req.params.id), res)
        })
    }

    post() {
        this.router.post('/responsavel', (req, res) => {
            const nome = req.body.nome
            const cpf = req.body.cpf
            const telefone1 = req.body.telefone_1
            const telefone2 = req.body.telefone_2
            const trabalho = req.body.trabalho
            const renda = req.body.renda
            const pensao = req.body.pensao
            const numeroTitulo = req.body.numero_titulo
            const zonaTitulo = req.body.zona_titulo
            const secaoTitulo = req.body.secao_titulo

            query(`insert into cidade(nome,cpf,telefone_1,telefone_2,trabalho,renda,pensao,numero_titulo,zona_titulo,
                secao_titulo) values ('${nome},${cpf},${telefone1},${telefone2},${trabalho},${renda},${pensao},
                ${numeroTitulo},${zona_titulo},${secao_titulo},1')`, res)
        })
    }

    put() {
        this.router.put('/responsavel/:id', (req, res) => {
            const nome = req.body.nome
            const cpf = req.body.cpf
            const telefone1 = req.body.telefone_1
            const telefone2 = req.body.telefone_2
            const trabalho = req.body.trabalho
            const renda = req.body.renda
            const pensao = req.body.pensao
            const numeroTitulo = req.body.numero_titulo
            const zonaTitulo = req.body.zona_titulo
            const secaoTitulo = req.body.secao_titulo
            const status = req.body.status

            query(`update cidade set nome="${nome}",cpf="${cpf}"telefone_1="${telefone1}",
                telefone_2="${telefone2}",trabalho="${trabalho}",renda="${renda}",pensao="${pensao}",
                numero_titulo="${numeroTitulo}",zona_titulo="${zonaTitulo}",secao_titulo="${secaoTitulo}",
                status="${status}" where id=` + parseInt(req.params.id), res)
        })
    }

    delete() {
        this.router.delete('/responsavel/:id', (req, res) => {
            query('delete from responsavel where id=' + parseInt(req.params.id), res)
        })
    }

}

module.exports = rotasCmei;