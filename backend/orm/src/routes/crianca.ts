import { Crianca } from "../entity/crianca.model";
import express = require("express");
import { Criterio } from "../entity/criterio.model";
import { Cmei } from "../entity/cmei.model";
import { Endereco } from "../entity/endereco.model";
import { Bairro } from "../entity/bairro.model";
import { Responsavel } from "../entity/responsavel.model";

class rotasCrianca {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/crianca", (req, res) => {
      connection.getRepository(Crianca).find({ relations: ["responsavelList", "responsavelList.responsavel"] }).then(result => { res.json(result) })
    });
  }

  getId(connection) {
    this.router.get("/crianca/:id", (req, res) => {
      connection.getRepository(Crianca).findOne(req.params.id, { relations: ["responsavelList", "responsavelList.responsavel"] }).then(result => { 
        console.log("find result")
        console.log(req.params.id)
        res.json(result) 
      })
    });
  }

  post(connection) {
    this.router.post("/crianca", (req, res) => {
      let cmeiOpcao1: Cmei = new Cmei().id = req.body.cmeiOpcao1.id;
      let cmeiOpcao2: Cmei = new Cmei().id = req.body.cmeiOpcao2.id;
      const nome = req.body.nome;
      const sexo = req.body.sexo;
      const nascimento = req.body.nascimento;
      const registro = req.body.registro;
      const livro = req.body.livro;
      const folha = req.body.folha;
      const cpf = req.body.cpf;

      const criterioList: Criterio[] = req.body.criterioList
      const responsavelList: Object[] = req.body.responsavelList

      let newList = Array<Criterio>();
      let newListResp = new Array<{}>();

      criterioList.forEach(item => {
        let criterio = new Criterio();
        criterio.id = item.id
        newList.push(criterio);
      })

      responsavelList.forEach(item => {
        let responsavel = new Responsavel().id = item['id'];
        newListResp.push({ tipo: item['tipo'], responsavel });
      })

      let crianca = new Crianca(
        nome,
        sexo,
        nascimento,
        registro,
        livro,
        folha,
        cpf,
        new Endereco(req.body.endereco.rua, req.body.endereco.numero,
           new Bairro().id = req.body.endereco.bairro),
        cmeiOpcao1,
        cmeiOpcao2,
        null,
        1)

      crianca.responsavelList = newListResp
      crianca.criterioList = newList

      connection.getRepository(Crianca).save(crianca).then(result => {
        console.log("saving crianca... ")
        console.log(result)
        res.json(result)
      })

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
      const status = req.body.status;
      const criterioList = req.body.criterioList

      const crianca = new Crianca(nome, sexo, nascimento, registro, livro, folha, cpf, enderecoId, cmeiOpcao1, cmeiOpcao2, criterioList, status, req.params.id)

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
