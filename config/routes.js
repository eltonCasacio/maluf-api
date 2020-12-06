module.exports = (app) => {
  app.route("/receitas").post(app.api.receita.save).get(app.api.receita.get);

  app.route("/receitas/:id").put(app.api.receita.save);

  app.route("/usuarios").post(app.api.usuario.save).get(app.api.usuario.get);

  app.route("/usuarios/:username/:password").get(app.api.usuario.permission);

  app.route("/realtimeData").get(app.api.dados.getRealTime);

  app.route("/list-data").get(app.api.dados.getVectorChart);

  app.route("/description").post(app.api.receita.sendToCLP);

  app.route("/historic/:dateTimeStart/:dateTimeEnd").get(app.api.historic.get);
  
  app.route("/historic").post(app.api.historic.pdf);
};
