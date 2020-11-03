const express = require("express"); //usado na conexao com a API

const query = require("../conection");

class rotasCrianca {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll() {
    this.router.get("/crianca", (req, res) => {
      query("select * from crianca order by id", res);
    });
  }

  getId() {
    this.router.get("/crianca/:id", (req, res) => {
      query("select * from crianca where id=" + parseInt(req.params.id), res);
    });
  }

  post() {
    this.router.post("/crianca", (req, res) => {
      const sexo = req.body.sexo;
      const nascimento = req.body.nascimento;
      const registro = req.body.registro;
      const livro = req.body.livro;
      const folha = req.body.folha;
      const cpf = req.body.cpf;
      const enderecoId = req.body.enderecoId;
      const cmeiOpcao1 = req.body.cmeiOpcao1;
      const cmeiOpcao2 = req.body.cmeiOpcao2;

      //const date = new Date(nascimento)

      console.log(sexo);
      //fix "foha" -> "folha", fix "enderco_id" -> "endereco_id"
      query(
        `insert into crianca(sexo,nascimento,registro,livro,foha,cpf,enderco_id,cmei_opcao1,cmei_opcao2,
            status) values (${sexo},"${nascimento}",${registro},${livro},${folha},${cpf},${enderecoId},
            ${cmeiOpcao1},${cmeiOpcao2},1)`,
        res
      );
    });
  }

  put() {
    this.router.put("/crianca/:id", (req, res) => {
      const id = req.body.id;
      const sexo = req.body.sexo;
      const nascimento = req.body.nascimento;
      const registro = req.body.registro;
      const livro = req.body.livro;
      const folha = req.body.folha;
      const cpf = req.body.cpf;
      const idEndereco = req.body.endereco_id;
      const bairroId = req.body.bairro_id;
      const cmeiOpcao1 = req.body.cmei_opcao1;
      const cmeiOpcao2 = req.body.cmei_opcao2;
      const cidadeId = req.body.cidade_id;
      const status = req.body.status;
      query(
        `update crianca set sexo="${sexo}",nascimento="${nascimento}",registro="${registro}",
                livro="${livro}",folha="${folha}",cpf="${cpf}",endereco_id="${idEndereco}",
                bairro_id="${bairroId}",cmei_opcao1="${cmeiOpcao1}",cmei_opcao2="${cmeiOpcao2}",
                cidade_id="${cidadeId}",status = "${status}" where id=` + id,
        res
      );
    });
  }

  delete() {
    this.router.delete("/crianca/:id", (req, res) => {
      query("delete from crianca where id=" + parseInt(req.params.id), res);
    });
  }
}

module.exports = rotasCrianca;
