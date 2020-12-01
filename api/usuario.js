const bcrypt = require("bcrypt");

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validator;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const usuario = { ...req.body };

    if (req.params.id) usuario.id = req.params.id;

    try {
      existsOrError(usuario.nome, "Nome de usuário não informado");
      existsOrError(usuario.senha, "Senha não informada");

      const usuarioFromDB = await app
        .bancoDados("usuario")
        .where({ nome: usuario.nome });

      if (!usuario.id) {
        notExistsOrError(usuarioFromDB, "usuario ja cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    usuario.senha = encryptPassword(usuario.senha);

    if (usuario.id) {
      app
        .bancoDados("usuarios")
        .update(usuario)
        .where({ id: usuario.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .bancoDados("usuarios")
        .insert(usuario)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .bancoDados("usuarios")
      .select("id", "nome")
      .then((usuario) => res.json(usuario))
      .catch((err) => res.status(500).send(err));
  };

  const permission = (req, res) => {
    const { username, password } = req.params;
    app
      .bancoDados("usuarios")
      .where({ nome: username, senha: password })
      .then((usuario) => {
        console.log(usuario);
        res.send(usuario.length > 0);
      })
      .catch((err) => res.status(400).send(err));
  };

  return { save, get, permission };
};
