const express = require("express"); //usado na conexao com a API

const query = require("../conection");

class rotasCmei {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll() {
    this.router.get("/responsavel", (req, res) => {
      query("select * from responsavel order by id", res);
    });
  }

  getId() {
    this.router.get("/responsavel/:id", (req, res) => {
      query(
        "select * from responsavel where id=" + parseInt(req.params.id),
        res
      );
    });
  }

  getCriancaResponsavel() {
    this.router.get(
      "/responsavel/aux/getWithRespId/:responsavel_id",
      (req, res) => {
        query(
          "select * from aux_crianca_responsavel where responsavel_id=" +
            parseInt(req.params.responsavel_id),
          res
        );
      }
    );
  }

  getResponsavelCrianca() {
    this.router.get(
      "/responsavel/aux/getWithCriancaId/:crianca_id",
      (req, res) => {
        query(
          "select * from aux_crianca_responsavel where crianca_id=" +
            parseInt(req.params.crianca_id),
          res
        );
      }
    );
  }

  post() {
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

      query(
        `insert into responsavel(nome,cpf,telefone_1,telefone_2,trabalho,renda,pensao,numero_titulo,
          zona_titulo,secao_titulo,status) values ("${nome}",${cpf},${telefone1},${telefone2},
            "${trabalho}",${renda},${pensao},${numeroTitulo},${zonaTitulo},${secaoTitulo},1)`,
        res
      );
    });
  }

  postAux() {
    this.router.post("/responsavelAux", (req, res) => {
      const criancaId = req.body.criancaId;
      const responsavelId = req.body.responsavelId;
      const responsavelTipo = req.body.responsavelTipo;

      query(
        `insert into aux_crianca_responsavel(responsavel_id,crianca_id,tipo)values(${responsavelId},${criancaId},"${responsavelTipo}")`,
        res
      );
    });
  }

  deleteAux() {
    this.router.delete("/responsavelAux/:id", (req, res) => {
      query(
        `delete from aux_crianca_responsavel where crianca_id=${req.params.id}`,
        res
      );
    });
  }

  put() {
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

      query(
        `update responsavel set nome="${nome}",cpf="${cpf}"telefone_1="${telefone1}",
                telefone_2="${telefone2}",trabalho="${trabalho}",renda="${renda}",pensao="${pensao}",
                numero_titulo="${numeroTitulo}",zona_titulo="${zonaTitulo}",secao_titulo="${secaoTitulo}",
                status="${status}" where id=` + parseInt(req.params.id),
        res
      );
    });
  }

  delete() {
    this.router.delete("/responsavel/:id", (req, res) => {
      query("delete from responsavel where id=" + parseInt(req.params.id), res);
    });
  }
}

module.exports = rotasCmei;
