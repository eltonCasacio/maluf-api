module.exports = (app) => {
  const get = (req, res) => {
    const { dateStart, dateEnd } = req.body;
    app
      .bancoDados("registros")
      .select("*")
      .whereBetween("updated_at", [dateStart, dateEnd])
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.status(500).send(err));
  };

  return { get };
};
