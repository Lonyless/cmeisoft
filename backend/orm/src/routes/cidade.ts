import { Cidade } from "../entity/cidade.model";

const express = require("express"); //usado na conexao com a API

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/cidade", (req, res) => {
      connection.getRepository(Cidade).find().then(result => {res.json(result)})
    });
  }

  getId(connection) {
    this.router.get("/cidade/:id", (req, res) => {
      connection.getRepository(Cidade).findOne(req.params.id).then(result => {res.json(result)})
    });
  }

  post(connection) {
    this.router.post("/cidade", (req, res) => {
      const nome = req.body.nome;

      const cidade = new Cidade(nome)

      connection.getRepository(Cidade).save(cidade).then(result => {
        console.log("saving cidade... ")
        console.log(result)
        res.json(result)
      })

    });
  }

  put(connection) {
    this.router.put("/cidade/:id", (req, res) => {
      const nome = req.body.nome;

      const cidade = new Cidade(nome, req.params.id)

      connection.getRepository(Cidade).save(cidade).then(result => {res.json(result)})

    });
  }

  delete(connection) {
    this.router.delete("/cidade/:id", (req, res) => {
      const cidade = new Cidade(null, req.params.id)

      connection.getRepository(Cidade).remove(cidade).then(result => {res.json(result)})
    });
  }
}

module.exports = rotasCmei;
