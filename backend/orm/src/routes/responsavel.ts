import { Responsavel } from "../entity/responsavel.model";

const express = require("express"); //usado na conexao com a API

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/responsavel", (req, res) => {

      connection.getRepository(Responsavel).find({ relations: ["criancaList", "criancaList.crianca"] }).then(result => {
        res.json(result)
      })

    });
  }

  getId(connection) {
    this.router.get("/responsavel/:id", (req, res) => {
      connection.getRepository(Responsavel).findOne(req.params.id, { relations: ["criancaList", "criancaList.crianca"] }).then(result => { res.json(result) })
    });
  }

  post(connection) {
    this.router.post("/responsavel", (req, res) => {
      const nome = req.body.nome;
      const cpf = req.body.cpf;
      const telefone1 = req.body.telefone1;
      const telefone2 = req.body.telefone2;
      const trabalho = req.body.trabalho;
      const renda = req.body.renda;
      const pensao = req.body.pensao;
      const numeroTitulo = req.body.numeroTitulo;
      const zonaTitulo = req.body.zonaTitulo;
      const secaoTitulo = req.body.secaoTitulo;

      const responsavel = new Responsavel(nome, cpf, telefone1, telefone2, trabalho, renda, pensao, numeroTitulo, zonaTitulo, secaoTitulo, 1)

//      console.log(responsavel)

      connection.getRepository(Responsavel).save(responsavel).then(result => {
        res.json(result)
      })

    });
  }

  deleteAux(connection) {
    this.router.delete("/responsavelAux/:id", (req, res) => {

      res.send("deprecated")

      // query(
      //   `delete from aux_crianca_responsavel where crianca_id=${req.params.id}`,
      //   res
      // );
    });
  }

  put(connection) {
    this.router.put("/responsavel/:id", (req, res) => {
      const nome = req.body.nome;
      const cpf = req.body.cpf;
      const telefone1 = req.body.telefone1;
      const telefone2 = req.body.telefone2;
      const trabalho = req.body.trabalho;
      const renda = req.body.renda;
      const pensao = req.body.pensao;
      const numeroTitulo = req.body.numeroTitulo;
      const zonaTitulo = req.body.zonaTitulo;
      const secaoTitulo = req.body.secaoTitulo;

      const responsavel = new Responsavel(
        nome, cpf, telefone1, telefone2, trabalho, renda, pensao, numeroTitulo, zonaTitulo, secaoTitulo,
        null, req.params.id);

      connection.getRepository(Responsavel).save(responsavel).then(result => { res.json(result) })

    });
  }

  delete(connection) {
    this.router.delete("/responsavel/:id", (req, res) => {

      const responsavel = new Responsavel(
        null, null, null, null, null, null, null, null, null, null, null, req.params.id);

      connection.getRepository(Responsavel).remove(responsavel).then(result => { res.json(result) })
    });
  }
}

module.exports = rotasCmei;
