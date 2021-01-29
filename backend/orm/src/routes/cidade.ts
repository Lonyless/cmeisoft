import { Cidade } from "../entity/cidade.model";

const express = require("express"); //usado na conexao com a API

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/cidade", (req, res) => {
      res.send(connection.getRepository(Cidade).find())
    });
  }

  getId(connection) {
    this.router.get("/cidade/:id", (req, res) => {
      res.send(connection.getRepository(Cidade).findOne(req.params.id))
    });
  }

  post(connection) {
    this.router.post("/cidade", (req, res) => {
      const nome = req.body.nome;

      const cidade = new Cidade(nome)

      res.send(connection.getRepository(Cidade).save(cidade))

    });
  }

  put(connection) {
    this.router.put("/cidade/:id", (req, res) => {
      const nome = req.body.nome;

      const cidade = new Cidade(nome, req.params.id)

      res.send(connection.getRepository(Cidade).save(cidade))

    });
  }

  delete(connection) {
    this.router.delete("/cidade/:id", (req, res) => {
      const cidade = new Cidade(null, req.params.id)

      res.send(connection.getRepository(Cidade).remove(cidade))
    });
  }
}

module.exports = rotasCmei;
