import { Crianca } from "../entity/crianca.model";
const express = require("express")

class rotasCrianca {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/crianca", (req, res) => {
      connection.getRepository(Crianca).find().then(result => { res.json(result) })
    });
  }

  getId(connection) {
    this.router.get("/crianca/:id", (req, res) => {
      connection.getRepository(Crianca).findOne(req.params.id).then(result => { res.json(result) })
    });
  }

  post(connection) {
    this.router.post("/crianca", (req, res) => {
      const nome = req.body.nome;
      const sexo = req.body.sexo;
      const nascimento = req.body.nascimento;
      const registro = req.body.registro;
      const livro = req.body.livro;
      const folha = req.body.folha;
      const cpf = req.body.cpf;
      const enderecoId = req.body.enderecoId;
      const cmeiOpcao1 = req.body.cmeiOpcao1;
      const cmeiOpcao2 = req.body.cmeiOpcao2;

      const crianca = new Crianca(sexo, nascimento, registro, livro, folha, cpf, enderecoId, cmeiOpcao1, cmeiOpcao2, 1, nome)

      connection.getRepository(Crianca).save(crianca).then(result => { res.json(result) })

    });
  }

  put(connection) {
    this.router.put("/crianca/:id", (req, res) => {
      const nome = req.body.nome;
      const sexo = req.body.sexo;
      const nascimento = req.body.nascimento;
      const registro = req.body.registro;
      const livro = req.body.livro;
      const folha = req.body.folha;
      const cpf = req.body.cpf;
      const enderecoId = req.body.enderecoId;
      const cmeiOpcao1 = req.body.cmeiOpcao1;
      const cmeiOpcao2 = req.body.cmeiOpcao2;

      const crianca = new Crianca(sexo, nascimento, registro, livro, folha, cpf, enderecoId, cmeiOpcao1, cmeiOpcao2, 1, nome, req.params.id)

      connection.getRepository(Crianca).save(crianca).then(result => { res.json(result) })

    });
  }

  delete(connection) {
    this.router.delete("/crianca/:id", (req, res) => {
      const crianca = new Crianca(null, null, null, null, null, null, null, null, null, null, null, req.params.id)

      connection.getRepository(Crianca).remove(crianca).then(result => { res.json(result) })
    });
  }
}

module.exports = rotasCrianca;
