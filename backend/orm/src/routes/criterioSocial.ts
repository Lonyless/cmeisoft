import { Criterio } from "../entity/criterio.model";

const express = require("express"); //usado na conexao com a API

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/criteriosocial", (req, res) => {
      connection.getRepository(Criterio).find().then(result => {res.json(result)})
    });
  }

  getId(connection) {
    this.router.get("/criteriosocial/:id", (req, res) => {
      connection.getRepository(Criterio).findOne(req.params.id).then(result => {res.json(result)})
    });
  }

  getAux(connection) {
    this.router.get("/criteriosocialAux", (req, res) => {
      res.send("deprecated")
      //  query("select * from aux_crianca_criterio", res);
    });
  }

  postAux(connection) {
    this.router.post("/criteriosocialAux", (req, res) => {
      const criancaId = req.body.criancaId;
      const criterioId = req.body.criterioId;

      res.send("deprecated")

      // query(
      //   `insert into aux_crianca_criterio(crianca_id,criteriosocial_id)
      //           values(${criancaId},${criterioId})`,
      //   res
      // );
    });
  }

  deleteAux(connection) {
    this.router.delete("/criteriosocialAux/:id", (req, res) => {

      res.json("deprecated")

      //   query(`delete from aux_crianca_criterio where crianca_id=${req.params.id}`, res);
    });
  }

  post(connection) {
    this.router.post("/criteriosocial", (req, res) => {
      const descricao = req.body.descricao;
      const peso = req.body.peso;

      const criterio = new Criterio(descricao, peso, 1)

      console.log(criterio)

     connection.getRepository(Criterio).save(criterio).then(result => {res.json(result)})

    });
  }

  put(connection) {
    this.router.put("/criteriosocial/:id", (req, res) => {
      const descricao = req.body.descricao;
      const peso = req.body.peso;
      const status = req.body.status;

      const criterio = new Criterio(descricao, peso, status, req.params.id)

      connection.getRepository(Criterio).save(criterio).then(result => {res.json(result)})

    });
  }

  delete(connection) {
    this.router.delete("/criteriosocial/:id", (req, res) => {

      const criterio = new Criterio(null, null, null, req.params.id)

      connection.getRepository(Criterio).remove(criterio).then(result => {res.json(result)})

    });
  }
}

module.exports = rotasCmei;
