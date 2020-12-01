module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const save = async (req, res) => {
    const receita = { ...req.body };

    if (req.params.id) receita.id = req.params.id;

    try {
      existsOrError(receita.nome, "Nome da receita não informado");
      existsOrError(receita.temperatura1, "Informar temperatura1");
      existsOrError(
        receita.temperatura1Max,
        "Informar temperatura maxima temperatura1"
      );
      existsOrError(
        receita.temperatura1Min,
        "Informar temperatura minima temperatura1"
      );

      existsOrError(receita.temperatura2, "Informar temperatura2");
      existsOrError(
        receita.temperatura2Max,
        "Informar temperatura maxima temperatura2"
      );
      existsOrError(
        receita.temperatura2Min,
        "Informar temperatura minima temperatura2"
      );

      existsOrError(receita.velocidade, "Informar velocidade");
      existsOrError(receita.velocidadeMax, "Informar velocidade maxima");
      existsOrError(receita.velocidadeMin, "Informar velocidade minima");

      existsOrError(receita.carga, "Informar carga");
      existsOrError(receita.cargaMax, "Informar carga maxima");
      existsOrError(receita.cargaMin, "Informar carga minima");

      const receitaFromBD = await app
        .bancoDados("receitas")
        .where({ nome: receita.nome });

      if (!receita.id) {
        notExistsOrError(receitaFromBD, "Receita ja cadastrada");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (receita.id) {
      app
        .bancoDados("receitas")
        .update(receita)
        .where({ id: receita.id })
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .bancoDados("receitas")
        .insert(receita)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .bancoDados("receitas")
      .select("*")
      .then((receitas) => res.json(receitas))
      .catch((err) => res.status(500).send(err));
  };

  const sendToCLP = (req, res) => {
    console.log(req.body);
  };

  return { save, get, sendToCLP };
};
