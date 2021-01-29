import { Crianca } from "../entity/crianca.model";

class rotasCrianca {
  router = express.Router();

  constructor(router) {
    this.router = router;
  }

  getAll(connection) {
    this.router.get("/crianca", (req, res) => {
      res.send(connection.getRepository(Crianca).find())
    });
  }

  getId(connection) {
    this.router.get("/crianca/:id", (req, res) => {
      res.send(connection.getRepository(Crianca).findOne(req.params.id))
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

      res.send(connection.getRepository(Crianca).save(crianca))

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

      res.send(connection.getRepository(Crianca).save(crianca))

    });
  }

  delete(connection) {
    this.router.delete("/crianca/:id", (req, res) => {
      const crianca = new Crianca(null, null, null, null, null, null, null, null, null, null, null, req.params.id)
    
      res.send(connection.getRepository(Crianca).remove(crianca))
    });
  }
}

module.exports = rotasCrianca;
