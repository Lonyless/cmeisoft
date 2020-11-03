const express = require("express"); //usado na conexao com a API

const query = require("../conection");

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll() {
    this.router.get("/cidade", (req, res) => {
      query("select * from cidade order by id", res);
    });
  }

  getId() {
    this.router.get("/cidade/:id", (req, res) => {
      query("select * from cidade where id=" + parseInt(req.params.id), res);
    });
  }

  post() {
    this.router.post("/cidade", (req, res) => {
      const nome = req.body.nome;

      console.log(nome);

      query(
        `insert into cidade(nome)
            values('${nome}')`,
        res
      );
    });
  }

  put() {
    this.router.put("/cidade/:id", (req, res) => {
      const nome = req.body.nome;
      query(
        `update cidade set nome="${nome}" where id=` + parseInt(req.params.id),
        res
      );
    });
  }

  delete() {
    this.router.delete("/cidade/:id", (req, res) => {
      query("delete from cidade where id=" + parseInt(req.params.id), res);
    });
  }
}

module.exports = rotasCmei;
