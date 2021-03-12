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
        console.log(result)
      })

    });
  }

  getId(connection) {
    this.router.get("/responsavel/:id", (req, res) => {
      connection.getRepository(Responsavel).findOne(req.params.id, { relations: ["criancaList", "criancaList.crianca"] }).then(result => { res.json(result) })
    });
  }

  getCriancaResponsavel(connection) {
    this.router.get(
      "/responsavel/aux/getWithRespId/:responsavel_id",
      (req, res) => {

        res.send("deprecated")

        // query(
        //   "select * from aux_crianca_responsavel where responsavel_id=" +
        //     parseInt(req.params.responsavel_id),
        //   res
        // );
      }
    );
  }


  getResponsavelCrianca(connection) {
    this.router.get(
      "/responsavel/aux/getWithCriancaId/:crianca_id",
      (req, res) => {

        res.send("deprecated")

        // query(
        //   "select * from responsavel join aux_crianca_responsavel where responsavel.id = aux_crianca_responsavel.responsavel_id and crianca_id ="+
        //   //"select * from aux_crianca_responsavel where crianca_id=" +
        //     parseInt(req.params.crianca_id),
        //   res
        // );
      }
    );
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

      console.log(responsavel)

      connection.getRepository(Responsavel).save(responsavel).then(result => {
        res.json(result)
      })

    });
  }

  postAux(connection) {
    this.router.post("/responsavelAux", (req, res) => {
      const criancaId = req.body.criancaId;
      const responsavelId = req.body.responsavelId;
      const responsavelTipo = req.body.responsavelTipo;

      res.send("deprecated")

      // query(
      //   `insert into aux_crianca_responsavel(responsavel_id,crianca_id,tipo)values(${responsavelId},${criancaId},"${responsavelTipo}")`,
      //   res
      // );
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
