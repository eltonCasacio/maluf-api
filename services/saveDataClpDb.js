module.exports = (app) => {
  const { getData } = require("../services/requestDataCLP")();

  const saveData = () => {
    clpData = getData();
    app
      .bancoDados("registros")
      .insert({
        temperatura1: parseFloat(clpData.temperatura1),
        temperatura2: parseFloat(clpData.temperatura2),
        velocidade: parseFloat(clpData.velocidade),
        carga: parseFloat(clpData.carga),
      })
      .catch((err) => console.log(`ERRO ${err}`));
  };

  setInterval(function () {
    saveData();
  }, 10000);
};
