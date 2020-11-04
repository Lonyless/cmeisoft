const express = require("express"); //usado na conexao com a API

const query = require("../conection");

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll() {
    this.router.get("/criteriosocial", (req, res) => {
      query("select * from criteriosocial order by id", res);
    });
  }

  getId() {
    this.router.get("/criteriosocial/:id", (req, res) => {
      query(
        "select * from criteriosocial where id=" + parseInt(req.params.id),
        res
      );
    });
  }

  postAux() {
    this.router.post("/criteriosocialAux", (req, res) => {
      const criancaId = req.body.criancaId;
      const criterioId = req.body.criterioId;

      query(
        `insert into aux_crianca_criterio(crianca_id,criteriosocial_id)
                values(${criancaId},${criterioId})`,
        res
      );
    });
  }

  post() {
    this.router.post("/criteriosocial", (req, res) => {
      const descricao = req.body.descricao;
      const peso = req.body.peso;
      const criancaId = req.body.crianca_id;

      query(
        `insert into criteriosocial(descricao,peso,crianca_id)
                values('${descricao},${peso},${criancaId},1')`,
        res
      );
    });
  }

  put() {
    this.router.put("/criteriosocial/:id", (req, res) => {
      const descricao = req.body.descricao;
      const peso = req.body.peso;
      const criancaId = req.body.crianca_id;
      const status = req.body.status;

      query(
        `update criteriosocial set descricao="${descricao}",peso="${peso}",crianca_id="${criancaId}" 
                where id=` + parseInt(req.params.id),
        res
      );
    });
  }

  delete() {
    this.router.delete("/criteriosocial/:id", (req, res) => {
      query(
        "delete from criteriosocial where id=" + parseInt(req.params.id),
        res
      );
    });
  }
}

module.exports = rotasCmei;
