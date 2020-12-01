const app = require("express")();
const consign = require("consign");
const { initReadCLP } = require("./services/requestDataCLP")();
const bancoDados = require("./config/bd");

app.bancoDados = bancoDados;

consign()
  .then("./config/middlewares.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./config/routes.js")
  .then("./services/saveDataClpDb.js")
  .into(app);

initReadCLP();

const port = 3001;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
