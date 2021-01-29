const express = require('express')  //usado na conexao com a API


class rotasCmei {

    router = express.Router()

    constructor(router) {
        this.router = router;
    }

    getAll() {
        this.router.get('/contemplado', (req, res) => {
        //    query("select * from contemplado order by id", res)
        })
    }

    getId() {
        this.router.get('/contemplado/:crianca_id', (req, res) => {
        //    query("select * from contemplado where crianca_id=" + parseInt(req.params.id), res)
        })
    }

    post() {
        this.router.post('/contemplado', (req, res) => {
            const criancaId = req.body.crianca_id
            const data = req.body.data
            const aceitou = req.body.aceitou
            const continuaLista = req.body.continua_lista
            const idCmei = req.body.id_cmei

            // query(`insert into contemplado(crianca_id,data,aceitou,continua_lista,id_cmei)
            //     values('${criancaId},${data},${aceitou},${continuaLista},${idCmei}')`, res)
        })
    }

    put() {
        this.router.put('/contemplado/:crianca_id', (req, res) => {
            const criancaId = req.body.crianca_id
            const data = req.body.data
            const aceitou = req.body.aceitou
            const continuaLista = req.body.continua_lista
            const idCmei = req.body.id_cmei

            // query(`update criteriosocial set data="${data}",aceitou="${aceitou}",continua_lista="${idCmei}",
            //     id_cmei="${continuaLista}" where id=` + parseInt(req.params.id), res)
        })
    }

    delete() {
        this.router.delete('/contemplado/:crianca_id', (req, res) => {
         //   query('delete from contemplado where crianca_id=' + parseInt(req.params.id), res)
        })
    }

}

module.exports = rotasCmei;